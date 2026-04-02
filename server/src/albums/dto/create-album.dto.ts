import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AlbumStatus } from '@prisma/client';

export class CreateAlbumDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mediaIds?: string[];

  @IsOptional()
  @IsEnum(AlbumStatus)
  status?: AlbumStatus;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverPhotoId?: string;

  @IsOptional()
  @IsArray()
  mediaIds?: string[];

  @IsOptional()
  @IsEnum(AlbumStatus)
  status?: AlbumStatus;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;
}
