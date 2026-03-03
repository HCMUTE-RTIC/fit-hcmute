import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFormDefinitionDto,
  UpdateFormDefinitionDto,
} from './dto/create-form.dto';
import { generateSlug } from '../common/utils/slug.util';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.formDefinition.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.formDefinition.delete({ where: { id } });
  }
}
