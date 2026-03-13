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
   * Lấy chi tiết một album theo slug, bao gồm cả các media bên trong
   */
  async getAlbumBySlug(slug: string): Promise<MediaAlbum> {
    const res = await fetch(`${API_URL}/api/albums/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không tìm thấy album");
    }

    return res.json();
  },
};
