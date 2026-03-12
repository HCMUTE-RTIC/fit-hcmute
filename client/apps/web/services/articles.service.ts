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
  summary: string;
  content: string;
  thumbnail: string;
  category: "NEWS" | "EVENT";
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
      next: { revalidate: 3600 }, // Matches cache TTL from backend
    });

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    return res.json();
  },

  findBySlug: async (slug: string): Promise<Article> => {
    const res = await fetch(`${API_URL}/api/articles/${slug}`, {
        cache: "no-store", // Always fetch fresh to increment view count as noted in backend
    });

    if (!res.ok) {
        throw new Error("Failed to fetch article details");
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
        throw new Error("Failed to create article");
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
        throw new Error("Failed to update article");
    }

    return res.json();
  },

  findById: async (id: string): Promise<Article> => {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch article");
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
        throw new Error("Failed to delete article");
    }
  },
};
