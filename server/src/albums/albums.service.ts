import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/create-album.dto';
import { generateSlug } from 'src/common/utils/slug.util';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateUniqueSlug(title: string): Promise<string> {
    let slug = generateSlug(title);

    const exists = await this.prisma.mediaAlbum.findUnique({
      where: { slug },
    });

    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }
    return slug;
  }

  async create(userId: string, dto: CreateAlbumDto) {
    const slug = await this.generateUniqueSlug(dto.title);

    let coverPhotoId: string | null = null;
    if (dto.mediaIds && dto.mediaIds.length > 0) {
      coverPhotoId = dto.mediaIds[0];
    }

    return this.prisma.mediaAlbum.create({
      data: {
        title: dto.title,
        slug: slug,
        description: dto.description,
        coverPhotoId: coverPhotoId,
        createdBy: userId,
        medias: dto.mediaIds
          ? { connect: dto.mediaIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        medias: true,
      },
    });
  }

  async findAll() {
    return this.prisma.mediaAlbum.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        medias: { take: 1 },
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findOne(id: string) {
    const album = await this.prisma.mediaAlbum.findUnique({
      where: { id },
      include: {
        medias: true,
        user: { select: { name: true } },
      },
    });

    if (!album) throw new NotFoundException(`Album with ID ${id} not found`);
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    await this.findOne(id);

    const data: any = { ...dto };

    if (dto.title) {
      data.slug = await this.generateUniqueSlug(dto.title);
    }

    if (dto.mediaIds) {
      data.medias = { set: dto.mediaIds.map((mediaId) => ({ id: mediaId })) };
    }

    return this.prisma.mediaAlbum.update({
      where: { id },
      data: data,
      include: { medias: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.mediaAlbum.delete({ where: { id } });
  }
}
