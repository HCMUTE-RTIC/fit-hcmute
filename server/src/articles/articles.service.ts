import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import slugify from 'slugify';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ArticlesService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    // Hàm tạo Slug duy nhất chuẩn SEO
    private async generateUniqueSlug(title: string): Promise<string> {
        let slug = slugify(title, { lower: true, strict: true, locale: 'vi' });
        const exists = await this.prisma.article.findUnique({ where: { slug } });
        if (exists) {
            slug = `${slug}-${Date.now()}`;
        }
        return slug;
    }

    // Cơ chế xóa cache 
    private async clearArticlesCache() {
        // Xóa cứng key bài viết đã set trong controller
        await this.cacheManager.del('articles_list');
    }

    async create(createArticleDto: CreateArticleDto, authorId: string) {
        const slug = await this.generateUniqueSlug(createArticleDto.title);

        const article = await this.prisma.article.create({
            data: {
                ...createArticleDto,
                slug,
                authorId,
                publishedAt: createArticleDto.status === 'PUBLISHED' ? new Date() : null,
            },
        });

        // Ngay khi tạo thành công, tiến hành invalidates cache Redis 
        await this.clearArticlesCache();
        return article;
    }

    async findAll() {
        return this.prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { id: true, name: true, avatar: true } }
            }
        });
    }

    async findBySlug(slug: string) {
        const article = await this.prisma.article.findUnique({
            where: { slug },
            include: {
                author: { select: { id: true, name: true, avatar: true } }
            }
        });

        if (!article) throw new NotFoundException('Không tìm thấy bài viết');

        // Cập nhật lượt xem bg non-blocking (Promise lơ lửng không cần block UI)
        this.prisma.article.update({
            where: { id: article.id },
            data: { viewCount: { increment: 1 } }
        }).catch(() => { });

        return article;
    }

    async update(id: string, updateArticleDto: UpdateArticleDto) {
        const data: any = { ...updateArticleDto };

        // Nếu user sửa tiêu đề, ta có thể sinh lại đường dẫn thân thiện mới
        if (updateArticleDto.title) {
            data.slug = await this.generateUniqueSlug(updateArticleDto.title);
        }

        // Auto stamp ngày tháng xuất bản
        if (updateArticleDto.status === 'PUBLISHED') {
            data.publishedAt = new Date();
        }

        const article = await this.prisma.article.update({
            where: { id },
            data,
        });

        // Xóa cache để Home page cập nhật
        await this.clearArticlesCache();
        return article;
    }

    async remove(id: string) {
        await this.prisma.article.delete({ where: { id } });
        await this.clearArticlesCache();
        return { message: 'Đã xóa bài viết khỏi cơ sở dữ liệu' };
    }
}
