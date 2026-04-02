import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /** Public — frontend cần đọc config để biết trang nào bật/tắt */
  @Get()
  getAll() {
    return this.settingsService.getAll();
  }

  /** Admin — cập nhật config */
  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  update(@Body() body: Record<string, string>) {
    return this.settingsService.setBulk(body);
  }
}
