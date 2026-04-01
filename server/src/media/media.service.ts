import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as Minio from 'minio';
import { PrismaService } from '../prisma/prisma.service';
import {
  assertSafeUploadFile,
  getSafeStoredExtension,
} from '../common/utils/file-security.util';

@Injectable()
export class MediaService {
  private minioClient: Minio.Client;
  private readonly bucketName =
    process.env.MINIO_BUCKET_NAME || 'fit-25-media-dev';

  constructor(private prisma: PrismaService) {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey:
        process.env.MINIO_ACCESS_KEY ||
        process.env.MINIO_ROOT_USER ||
        'admin_minio',
      secretKey:
        process.env.MINIO_SECRET_KEY ||
        process.env.MINIO_ROOT_PASSWORD ||
        'admin_minio_1234',
    });
  }

  async uploadSingleFile(
    file: Express.Multer.File,
    userId: string,
    albumId?: string,
  ) {
    try {
      assertSafeUploadFile(file, 'private-media');

      const extension = getSafeStoredExtension(file);
      const uuidStr = crypto.randomUUID().replace(/-/g, '');
      const key = `${Date.now()}_${uuidStr}.${extension}`;

      await this.minioClient.putObject(
        this.bucketName,
        key,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype },
      );

      const minioPublicUrl = process.env.MINIO_PUBLIC_URL;
      const publicUrl = minioPublicUrl
        ? `${minioPublicUrl}/${this.bucketName}/${key}`
        : `/media_storage/${this.bucketName}/${key}`;

      let category: 'IMAGE' | 'VIDEO' | 'PDF_YEARBOOK' | 'ATTACHMENT' =
        'ATTACHMENT';
      if (file.mimetype.startsWith('image/')) category = 'IMAGE';
      else if (file.mimetype.startsWith('video/')) category = 'VIDEO';
      else if (file.mimetype === 'application/pdf') category = 'PDF_YEARBOOK';

      return this.prisma.media.create({
        data: {
          key,
          url: publicUrl,
          fileName: `${uuidStr}.${extension}`,
          mimeType: file.mimetype,
          size: file.size,
          category,
          uploadedBy: userId,
          albumId: albumId || null,
        },
      });
    } catch (error: any) {
      console.error('Upload failed:', error);
      throw new InternalServerErrorException(
        `Unable to store uploaded file. Details: ${error.message || error}`,
      );
    }
  }

  async uploadPublicFile(file: Express.Multer.File): Promise<string> {
    assertSafeUploadFile(file, 'public-image');

    const extension = getSafeStoredExtension(file);
    const uuidStr = crypto.randomUUID().replace(/-/g, '');
    const key = `public/${Date.now()}_${uuidStr}.${extension}`;

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

  async deleteFile(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) {
      throw new NotFoundException('Media not found.');
    }

    try {
      await this.minioClient.removeObject(this.bucketName, media.key);
    } catch (error: any) {
      console.error('MinIO delete failed:', error);
    }

    await this.prisma.media.delete({ where: { id } });
  }

  async uploadBatchFiles(
    files: Express.Multer.File[],
    userId: string,
    albumId?: string,
  ) {
    const uploadedRecords: any[] = [];
    for (const file of files) {
      const record = await this.uploadSingleFile(file, userId, albumId);
      uploadedRecords.push(record);
    }
    return uploadedRecords;
  }
}
