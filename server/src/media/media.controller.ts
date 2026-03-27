import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  assertSafeUploadFile,
  isAllowedUploadMimeType,
  MAX_BATCH_UPLOAD_COUNT,
  MAX_PRIVATE_UPLOAD_BYTES,
} from '../common/utils/file-security.util';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.EDITOR)
  async deleteFile(@Param('id') id: string) {
    await this.mediaService.deleteFile(id);
    return { success: true, message: 'File deleted successfully.' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_PRIVATE_UPLOAD_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!isAllowedUploadMimeType(file.mimetype, 'private-media')) {
          cb(new BadRequestException('Unsupported file type.'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body('albumId') albumId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Missing upload file.');
    }

    assertSafeUploadFile(file, 'private-media');

    const userId = req.user.id;
    const media = await this.mediaService.uploadSingleFile(file, userId, albumId);

    return {
      success: true,
      message: 'File uploaded successfully.',
      data: media,
      errorCode: null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-batch')
  @UseInterceptors(
    FilesInterceptor('files', MAX_BATCH_UPLOAD_COUNT, {
      limits: {
        fileSize: MAX_PRIVATE_UPLOAD_BYTES,
        files: MAX_BATCH_UPLOAD_COUNT,
      },
      fileFilter: (_req, file, cb) => {
        if (!isAllowedUploadMimeType(file.mimetype, 'private-media')) {
          cb(new BadRequestException('Unsupported file type.'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadBatchFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
    @Body('albumId') albumId?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Missing upload files.');
    }

    files.forEach((file) => assertSafeUploadFile(file, 'private-media'));

    const userId = req.user.id;
    const medias = await this.mediaService.uploadBatchFiles(
      files,
      userId,
      albumId,
    );

    return {
      success: true,
      message: `Uploaded ${files.length} file(s) successfully.`,
      data: medias,
      errorCode: null,
    };
  }
}
