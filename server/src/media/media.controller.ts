import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, Req, Body, BadRequestException } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file')) // Cài đặt bắt param `file` từ form-data
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any, @Body('albumId') albumId?: string) {
        if (!file) throw new BadRequestException('Bắt buộc đính kèm fle.');

        // Lấy ID người dùng từ payload JWT Token
        const userId = req.user.id;
        const media = await this.mediaService.uploadSingleFile(file, userId, albumId);

        return {
            success: true,
            message: 'Tải file lên thành công',
            data: media,
            errorCode: null,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload-batch')
    @UseInterceptors(FilesInterceptor('files', 20)) // Cài bắt mảng đa `files`, giới hạn 20 file 1 lần
    async uploadBatchFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req: any, @Body('albumId') albumId?: string) {
        if (!files || files.length === 0) throw new BadRequestException('Bắt buộc đính kèm các file cần tải lên.');

        const userId = req.user.id;
        const medias = await this.mediaService.uploadBatchFiles(files, userId, albumId);

        return {
            success: true,
            message: `Tải thành công chùm ${files.length} file`,
            data: medias,
            errorCode: null,
        };
    }
}
