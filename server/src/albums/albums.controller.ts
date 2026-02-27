import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/create-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('albums')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.EDITOR)
  create(@Req() req: any, @Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(req.user.id, createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.EDITOR)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
