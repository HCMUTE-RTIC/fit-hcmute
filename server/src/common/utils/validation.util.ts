import { BadRequestException } from '@nestjs/common';
import { FieldType } from '@prisma/client';

export const validateFieldType = (
  label: string,
  type: FieldType,
  value: any,
  options: any,
) => {
  switch (type) {
    case 'EMAIL': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value !== 'string' || !emailRegex.test(value)) {
        throw new BadRequestException(
          `'${label}' phải là một địa chỉ Email hợp lệ.`,
        );
      }
      break;
    }

    case 'PHONE': {
      const phoneRegex = /^[0-9]{9,12}$/;
      if (
        typeof value !== 'string' ||
        !phoneRegex.test(value.replace(/\s/g, ''))
      ) {
        throw new BadRequestException(
          `'${label}' phải là số điện thoại hợp lệ.`,
        );
      }
      break;
    }

    case 'FILE': {
      const urlRegex = /^(http|https):\/\/[^ "]+$/;
      if (typeof value !== 'string' || !urlRegex.test(value)) {
        throw new BadRequestException(
          `'${label}' chưa được tải lên thành công (Invalid URL).`,
        );
      }
      break;
    }

    case 'SELECT':
    case 'RADIO': {
      const validOptions = Array.isArray(options) ? options : [];
      if (!validOptions.includes(value)) {
        throw new BadRequestException(
          `Giá trị của '${label}' không hợp lệ (Không nằm trong danh sách cho phép).`,
        );
      }
      break;
    }

    case 'CHECKBOX': {
      if (!Array.isArray(value)) {
        throw new BadRequestException(
          `'${label}' phải là một danh sách (mảng) các lựa chọn.`,
        );
      }
      break;
    }

    default: // TEXT, TEXTAREA
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new BadRequestException(`'${label}' phải là chuỗi ký tự.`);
      }
  }
};
