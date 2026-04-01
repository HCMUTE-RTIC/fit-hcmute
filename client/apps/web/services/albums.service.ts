import { MediaAlbum } from "@/types/albums";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const albumsService = {
  /**
   * Lấy danh sách tất cả các albums
   */
  async getAlbums(): Promise<MediaAlbum[]> {
    const res = await fetch(`${API_URL}/api/albums`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tải danh sách album");
    }

    return res.json();
  },

  /**
   * Lấy chi tiết một album theo slug, có pagination
   */
  async getAlbumBySlug(
    slug: string,
    page = 1,
    limit = 20
  ): Promise<MediaAlbum> {
    const res = await fetch(
      `${API_URL}/api/albums/${slug}?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không tìm thấy album");
    }

    return res.json();
  },
};
