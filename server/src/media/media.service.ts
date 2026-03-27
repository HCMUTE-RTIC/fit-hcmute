import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Minio from 'minio';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
    private minioClient: Minio.Client;
    // Trùng khớp với bucket name 'fit-25-media-dev' đã được script docker tạo sẵn
    private readonly bucketName = process.env.MINIO_BUCKET_NAME || 'fit-25-media-dev';

    constructor(private prisma: PrismaService) {
        this.minioClient = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000', 10),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY || process.env.MINIO_ROOT_USER || 'admin_minio',
            secretKey: process.env.MINIO_SECRET_KEY || process.env.MINIO_ROOT_PASSWORD || 'admin_minio_1234',
        });
    }

    async uploadSingleFile(file: Express.Multer.File, userId: string, albumId?: string) {
        try {
            const extension = file.originalname.split('.').pop();
            const uuidStr = crypto.randomUUID();
            const key = `${Date.now()}_${uuidStr.split('-')[0]}.${extension}`; // Tránh trùng tên thật

            // Up lên S3 MinIO
            await this.minioClient.putObject(
                this.bucketName,
                key,
                file.buffer,
                file.size,
                { 'Content-Type': file.mimetype }
            );

            // Tạo public URL: nếu có MINIO_PUBLIC_URL thì dùng trực tiếp, fallback về relative path
            const minioPublicUrl = process.env.MINIO_PUBLIC_URL;
            const publicUrl = minioPublicUrl
                ? `${minioPublicUrl}/${this.bucketName}/${key}`
                : `/media_storage/${this.bucketName}/${key}`;

            // Loại suy Category của file
            let category: 'IMAGE' | 'VIDEO' | 'PDF_YEARBOOK' | 'ATTACHMENT' = 'ATTACHMENT';
            if (file.mimetype.startsWith('image/')) category = 'IMAGE';
            else if (file.mimetype.startsWith('video/')) category = 'VIDEO';
            else if (file.mimetype === 'application/pdf') category = 'PDF_YEARBOOK';

            // Lưu bảng vào Postgres
            const mediaRecord = await this.prisma.media.create({
                data: {
                    key: key,
                    url: publicUrl,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    category: category,
                    uploadedBy: userId,
                    albumId: albumId || null,
                }
            });

            return mediaRecord;
        } catch (error: any) {
            console.error('Lỗi khi upload MinIO SDK:', error);
            throw new InternalServerErrorException(`Không thể tải file lên hệ thống lưu trữ S3. Chi tiết: ${error.message || error}`);
        }
    }

    /**
     * Upload công khai (không cần user) — dành cho form submission có ảnh.
     * Chỉ lưu lên MinIO, trả về URL, KHÔNG tạo record trong bảng Media.
     */
    async uploadPublicFile(file: Express.Multer.File): Promise<string> {
        const extension = file.originalname.split('.').pop();
        const uuidStr = crypto.randomUUID();
        const key = `public/${Date.now()}_${uuidStr.split('-')[0]}.${extension}`;

        await this.minioClient.putObject(
            this.bucketName,
            key,
            file.buffer,
            file.size,
            { 'Content-Type': file.mimetype },
        );

        const minioPublicUrl = process.env.MINIO_PUBLIC_URL;
        return minioPublicUrl
            ? `${minioPublicUrl}/${this.bucketName}/${key}`
            : `/media_storage/${this.bucketName}/${key}`;
    }

    async uploadBatchFiles(files: Express.Multer.File[], userId: string, albumId?: string) {
        const uploadedRecords: any[] = [];
        // Upload files theo luồng tuần tự để đảm bảo DB Consistency (Có thể dùng Promise.all để tối ưu tốc độ nếu cần thiết)
        for (const file of files) {
            const record = await this.uploadSingleFile(file, userId, albumId);
            uploadedRecords.push(record);
        }
        return uploadedRecords;
    }
}
