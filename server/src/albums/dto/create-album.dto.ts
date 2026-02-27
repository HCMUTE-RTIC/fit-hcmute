import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mediaIds?: string[];
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverPhotoId?: string;

  @IsOptional()
  @IsArray()
  mediaIds?: string[];
}
