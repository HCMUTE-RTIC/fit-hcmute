import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateFormDefinitionDto, UpdateFormDefinitionDto } from 'src/forms/dto/create-form.dto';
import { FormsService } from 'src/forms/forms.service';
import { SubmitFormDto } from './dto/submit-form.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post(':slug/submit')
  @HttpCode(HttpStatus.CREATED)
  submit(@Param('slug') slug: string, @Body() dto: SubmitFormDto) {
    return this.formsService.submit(slug, dto);
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
}
