import { getAuthToken } from "@/lib/auth"; // Assume a helper function exists, will add later or mock

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  category: "NEWS" | "EVENT";
  authorId: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  viewCount: number;
  isPinned: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleDto {
  title: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
  category?: "NEWS" | "EVENT";
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  isPinned?: boolean;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {}

export const ArticlesService = {
  findAll: async (): Promise<Article[]> => {
    const res = await fetch(`${API_URL}/api/articles`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tải danh sách bài viết");
    }

    return res.json();
  },

  findBySlug: async (slug: string): Promise<Article> => {
    const res = await fetch(`${API_URL}/api/articles/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không tìm thấy bài viết");
    }

    return res.json();
  },

  // Dùng cho trang admin edit — KHÔNG tăng lượt xem
  findBySlugAdmin: async (slug: string): Promise<Article> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/articles/${slug}/admin-preview`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không tìm thấy bài viết");
    }

    return res.json();
  },

  create: async (data: CreateArticleDto): Promise<Article> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tạo bài viết");
    }

    return res.json();
  },

  update: async (id: string, data: UpdateArticleDto): Promise<Article> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể cập nhật bài viết");
    }

    return res.json();
  },

  remove: async (id: string): Promise<void> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể xóa bài viết");
    }
  },
};
