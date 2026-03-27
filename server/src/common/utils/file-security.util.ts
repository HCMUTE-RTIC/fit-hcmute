import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const PRIVATE_MIME_TYPES = new Set([
  ...IMAGE_MIME_TYPES,
  'application/pdf',
  'video/mp4',
  'video/quicktime',
  'video/webm',
]);

const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
};

export const MAX_PUBLIC_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_PRIVATE_UPLOAD_BYTES = 50 * 1024 * 1024;
export const MAX_BATCH_UPLOAD_COUNT = 20;

export function isAllowedUploadMimeType(
  mimeType: string,
  scope: 'public-image' | 'private-media',
) {
  return scope === 'public-image'
    ? IMAGE_MIME_TYPES.has(mimeType)
    : PRIVATE_MIME_TYPES.has(mimeType);
}

export function assertSafeUploadFile(
  file: Express.Multer.File,
  scope: 'public-image' | 'private-media',
) {
  const allowedMime = isAllowedUploadMimeType(file.mimetype, scope);
  if (!allowedMime) {
    throw new BadRequestException('Unsupported file type.');
  }

  const maxSize =
    scope === 'public-image' ? MAX_PUBLIC_IMAGE_BYTES : MAX_PRIVATE_UPLOAD_BYTES;
  if (file.size > maxSize) {
    throw new BadRequestException('Uploaded file is too large.');
  }

  if (!hasExpectedFileSignature(file)) {
    throw new BadRequestException('Uploaded file content is invalid.');
  }
}

export function getSafeStoredExtension(file: Express.Multer.File) {
  return MIME_TO_EXTENSION[file.mimetype] ?? 'bin';
}

export function getSafeOriginalFileName(originalName: string) {
  const ext = path.extname(originalName).toLowerCase();
  const nameWithoutExt = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const safeBase = nameWithoutExt || 'file';
  const safeExt = ext.replace(/[^a-z0-9.]/g, '').slice(0, 10);
  return `${safeBase}${safeExt}`;
}

function hasExpectedFileSignature(file: Express.Multer.File) {
  const bytes = file.buffer;
  if (!bytes || bytes.length < 4) return false;

  switch (file.mimetype) {
    case 'image/jpeg':
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case 'image/png':
      return (
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
      );
    case 'image/gif':
      return (
        bytes[0] === 0x47 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x38
      );
    case 'image/webp':
      return (
        bytes.subarray(0, 4).toString('ascii') === 'RIFF' &&
        bytes.subarray(8, 12).toString('ascii') === 'WEBP'
      );
    case 'application/pdf':
      return bytes.subarray(0, 4).toString('ascii') === '%PDF';
    case 'video/mp4':
    case 'video/quicktime':
      return bytes.subarray(4, 8).toString('ascii') === 'ftyp';
    case 'video/webm':
      return (
        bytes[0] === 0x1a &&
        bytes[1] === 0x45 &&
        bytes[2] === 0xdf &&
        bytes[3] === 0xa3
      );
    default:
      return false;
  }
}
