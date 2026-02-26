export class CreateArticleDto {
    title: string;
    summary?: string;
    content: string;
    thumbnail?: string;
    category?: 'NEWS' | 'EVENT';
    metaTitle?: string;
    metaDescription?: string;
    focusKeywords?: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    isPinned?: boolean;
}

export class UpdateArticleDto {
    title?: string;
    summary?: string;
    content?: string;
    thumbnail?: string;
    category?: 'NEWS' | 'EVENT';
    metaTitle?: string;
    metaDescription?: string;
    focusKeywords?: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    isPinned?: boolean;
}
