import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFormDefinitionDto,
  UpdateFormDefinitionDto,
} from './dto/create-form.dto';
import { generateSlug } from '../common/utils/slug.util';
import { validateFieldType } from '../common/utils/validation.util';
import { SubmitFormDto } from 'src/forms/dto/submit-form.dto';
import { MailService } from '../mail/mail.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class FormsService {
  private readonly logger = new Logger(FormsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly mediaService: MediaService,
  ) {}

  private async generateUniqueSlug(title: string): Promise<string> {
    let slug = generateSlug(title);
    const exists = await this.prisma.formDefinition.findUnique({
      where: { slug },
    });
    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }
    return slug;
  }

  async create(dto: CreateFormDefinitionDto) {
    if (dto.eventId) {
      const eventExists = await this.prisma.article.findUnique({
        where: { id: dto.eventId },
      });
      if (!eventExists) {
        throw new BadRequestException('Event not found');
      }
    }
    const slug = await this.generateUniqueSlug(dto.title);

    return this.prisma.formDefinition.create({
      data: {
        title: dto.title,
        slug: slug,
        description: dto.description,
        eventId: dto.eventId || null,
        fields: {
          create: dto.fields.map((field, index) => ({
            name: field.name,
            label: field.label,
            type: field.type,
            required: field.required || false,
            options: field.options || [],
            order: field.order ?? index,
          })),
        },
      },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.formDefinition.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { submissions: true } },
        event: { select: { title: true, slug: true } },
      },
    });
  }

  async findOne(slug: string) {
    const form = await this.prisma.formDefinition.findUnique({
      where: { slug },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
        event: { select: { title: true } },
      },
    });

    if (!form) throw new NotFoundException(`Form not found`);
    return form;
  }

  async update(id: string, dto: UpdateFormDefinitionDto) {
    const { fields, ...formData } = dto;

    if (fields) {
      return this.prisma.$transaction(async (tx) => {
        await tx.formField.deleteMany({ where: { formId: id } });
        return tx.formDefinition.update({
          where: { id },
          data: {
            ...formData,
            fields: {
              create: fields.map((field, index) => ({
                name: field.name,
                label: field.label,
                type: field.type,
                required: field.required || false,
                options: field.options || [],
                order: field.order ?? index,
              })),
            },
          },
          include: { fields: { orderBy: { order: 'asc' } } },
        });
      });
    }

    return this.prisma.formDefinition.update({
      where: { id },
      data: formData,
    });
  }

  async remove(id: string) {
    return this.prisma.formDefinition.delete({ where: { id } });
  }

  async getSubmissions(formId: string) {
    return this.prisma.formSubmission.findMany({
      where: { formId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateSubmissionStatus(submissionId: string, status: SubmissionStatus) {
    const submission = await this.prisma.formSubmission.findUnique({
      where: { id: submissionId },
    });
    if (!submission) throw new NotFoundException('Submission not found');

    return this.prisma.formSubmission.update({
      where: { id: submissionId },
      data: { status },
    });
  }

  async getApprovedSubmissions(slug: string) {
    const form = await this.prisma.formDefinition.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!form) throw new NotFoundException('Form not found');

    return this.prisma.formSubmission.findMany({
      where: { formId: form.id, status: SubmissionStatus.APPROVED },
      orderBy: { createdAt: 'desc' },
      select: { id: true, data: true, createdAt: true },
    });
  }

  async submit(slug: string, dto: SubmitFormDto) {
    const formDef = await this.prisma.formDefinition.findUnique({
      where: { slug },
      include: { fields: { orderBy: { order: 'asc' } } },
    });

    if (!formDef) throw new NotFoundException(`Form definition not found`);

    const submissionData = dto.data;
    const cleanData: Record<string, any> = {};

    for (const field of formDef.fields) {
      const userValue = submissionData[field.name];

      if (
        field.required &&
        (userValue === undefined || userValue === null || userValue === '')
      ) {
        throw new BadRequestException(`Trường "${field.label}" là bắt buộc`);
      }

      if (
        !field.required &&
        (userValue === undefined || userValue === null || userValue === '')
      ) {
        continue;
      }

      if (userValue !== undefined) {
        validateFieldType(field.label, field.type, userValue, field.options);
        cleanData[field.name] = userValue;
      }
    }

    const submission = await this.prisma.formSubmission.create({
      data: {
        formId: formDef.id,
        eventId: formDef.eventId,
        data: cleanData,
      },
    });

    // === PUSH JOB GỬI EMAIL CẢM ƠN (Fire-and-forget) ===
    this.queueThankYouEmail(cleanData, formDef.title);

    return submission;
  }

  async submitWithMedia(slug: string, dto: SubmitFormDto, image?: Express.Multer.File) {
    const formDef = await this.prisma.formDefinition.findUnique({
      where: { slug },
      include: { fields: { orderBy: { order: 'asc' } } },
    });

    if (!formDef) throw new NotFoundException('Form definition not found');

    const submissionData = dto.data;
    const cleanData: Record<string, any> = {};

    for (const field of formDef.fields) {
      const userValue = submissionData[field.name];

      if (field.type === 'FILE') continue; // handled separately

      if (field.required && (userValue === undefined || userValue === null || userValue === '')) {
        throw new BadRequestException(`Trường "${field.label}" là bắt buộc`);
      }

      if (!field.required && (userValue === undefined || userValue === null || userValue === '')) {
        continue;
      }

      if (userValue !== undefined) {
        validateFieldType(field.label, field.type, userValue, field.options);
        cleanData[field.name] = userValue;
      }
    }

    // Upload image nếu có
    if (image) {
      const imageUrl = await this.mediaService.uploadPublicFile(image);
      cleanData['image_url'] = imageUrl;
    }

    const submission = await this.prisma.formSubmission.create({
      data: {
        formId: formDef.id,
        eventId: formDef.eventId,
        data: cleanData,
      },
    });

    this.queueThankYouEmail(cleanData, formDef.title);

    return submission;
  }

  /**
   * Tìm email + tên từ form data rồi đẩy job email cảm ơn vào queue.
   * Best-effort: nếu không tìm thấy email thì bỏ qua.
   */
  private queueThankYouEmail(
    data: Record<string, any>,
    formTitle: string,
  ): void {
    // Tìm field email (best-effort matching)
    const emailKeys = ['email', 'e_mail', 'e-mail', 'mail'];
    const emailKey = Object.keys(data).find((key) =>
      emailKeys.includes(key.toLowerCase()),
    );
    if (!emailKey || !data[emailKey]) return;

    // Tìm field tên (best-effort matching)
    const nameKeys = [
      'full_name',
      'fullname',
      'ho_ten',
      'hoten',
      'name',
      'ten',
      'ho_va_ten',
    ];
    const nameKey = Object.keys(data).find((key) =>
      nameKeys.includes(key.toLowerCase()),
    );
    const recipientName = nameKey ? String(data[nameKey]) : 'Bạn';

    // Fire-and-forget – không await, không ảnh hưởng response
    this.mailService
      .sendThankYouEmail(String(data[emailKey]), recipientName, formTitle)
      .catch((err) =>
        this.logger.error('Failed to queue thank-you email', err),
      );
  }
}

