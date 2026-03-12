import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    // POST: Cần Auth, Lấy user ID từ Token thay vì client truyền
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createArticleDto: CreateArticleDto, @Request() req: any) {
        return this.articlesService.create(createArticleDto, req.user.id);
    }

    // GET ALL: Public, Bắt qua In-Memory Redis Cache 
    @UseInterceptors(CacheInterceptor)
    @CacheKey('articles_list') // Key tĩnh để Clear Cache dễ dàng bên Service
    @CacheTTL(3600000) // TTL = 1h (cho Keyv version > 6.x)
    @Get()
    findAll() {
        return this.articlesService.findAll();
    }

    // GET DETAIL (Admin): Cần Auth, KHÔNG tăng lượt xem — dùng cho trang edit
    @UseGuards(JwtAuthGuard)
    @Get(':slug/admin-preview')
    findOneAdmin(@Param('slug') slug: string) {
        return this.articlesService.findBySlugAdmin(slug);
    }

    // GET DETAIL: Public, fetch trực tiếp DB để kích hoạt bộ đếm View
    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.articlesService.findBySlug(slug);
    }

    // PATCH: Cần Auth
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(id, updateArticleDto);
    }

    // DELETE: Cần Auth
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articlesService.remove(id);
    }
}
