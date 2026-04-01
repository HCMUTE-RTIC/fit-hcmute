import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import {
  assertSafeUploadFile,
  isAllowedUploadMimeType,
  MAX_PUBLIC_IMAGE_BYTES,
} from 'src/common/utils/file-security.util';
import {
  CreateFormDefinitionDto,
  UpdateFormDefinitionDto,
  UpdateSubmissionStatusDto,
} from 'src/forms/dto/create-form.dto';
import { FormsService } from 'src/forms/forms.service';
import { SubmitFormDto } from './dto/submit-form.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post(':slug/submit')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  submit(@Param('slug') slug: string, @Body() dto: SubmitFormDto) {
    return this.formsService.submit(slug, dto);
  }

  @Post(':slug/submit-with-media')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { ttl: 60_000, limit: 3 } })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: MAX_PUBLIC_IMAGE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!isAllowedUploadMimeType(file.mimetype, 'public-image')) {
          cb(new BadRequestException('Only image uploads are allowed.'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  submitWithMedia(
    @Param('slug') slug: string,
    @UploadedFile() image: Express.Multer.File,
    @Body('data') dataJson: string,
  ) {
    if (image) {
      assertSafeUploadFile(image, 'public-image');
    }

    const data = JSON.parse(dataJson);
    return this.formsService.submitWithMedia(slug, { data }, image);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  create(@Body() dto: CreateFormDefinitionDto) {
    return this.formsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.formsService.findOne(slug);
  }

  @Get(':id/submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  getSubmissions(@Param('id') id: string) {
    return this.formsService.getSubmissions(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateFormDefinitionDto) {
    return this.formsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.formsService.remove(id);
  }

  @Patch('submissions/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.EDITOR)
  updateSubmissionStatus(
    @Param('id') id: string,
    @Body() dto: UpdateSubmissionStatusDto,
  ) {
    return this.formsService.updateSubmissionStatus(id, dto.status);
  }

  @Get(':slug/public-submissions')
  getApprovedSubmissions(@Param('slug') slug: string) {
    return this.formsService.getApprovedSubmissions(slug);
  }
}
