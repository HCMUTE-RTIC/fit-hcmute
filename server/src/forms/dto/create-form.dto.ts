import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { FieldType, SubmissionStatus } from '@prisma/client';

export class CreateFormFieldDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  label!: string;

  @IsNotEmpty()
  @IsEnum(FieldType)
  type!: FieldType;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateFormDefinitionDto {
  @IsNotEmpty({ message: 'Tên form không được để trống' })
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  eventId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormFieldDto)
  fields!: CreateFormFieldDto[];
}

export class UpdateFormDefinitionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormFieldDto)
  fields?: CreateFormFieldDto[];
}

export class UpdateSubmissionStatusDto {
  @IsEnum(SubmissionStatus)
  status!: SubmissionStatus;
}
