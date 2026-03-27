import { getAuthToken } from "@/lib/auth";

export interface Media {
  id: string;
  albumId?: string | null;
  key?: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  category: "IMAGE" | "VIDEO" | "PDF_YEARBOOK" | "ATTACHMENT";
  uploadedBy?: string;
  createdAt: string;
}

export interface MediaAlbum {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverPhotoId?: string | null;
  coverPhoto?: Media;
  metaTitle?: string;
  metaDescription?: string;
  status: "DRAFT" | "PUBLISHED";
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    media?: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const GalleryService = {
  /**
   * Fetch all albums
   */
  async getAlbums(): Promise<MediaAlbum[]> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/albums/admin/all`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch albums");
    return await res.json();
  },

  /**
   * Fetch album by ID
   */
  async getAlbumById(id: string): Promise<MediaAlbum> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/albums/admin/${id}`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch album");
    return await res.json();
  },

  /**
   * Create new album
   */
  async createAlbum(data: Partial<MediaAlbum>): Promise<MediaAlbum> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/albums`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create album");
    return await res.json();
  },

  /**
   * Update album
   */
  async updateAlbum(id: string, data: Partial<MediaAlbum>): Promise<MediaAlbum> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/albums/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update album");
    return await res.json();
  },

  /**
   * Delete album
   */
  async deleteAlbum(id: string): Promise<boolean> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/albums/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to delete album");
    return true;
  },

  /**
   * Delete a media file
   */
  async deleteMedia(id: string): Promise<boolean> {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/media/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to delete media");
    return true;
  },

  /**
   * Batch Upload Media to an Album — uses XHR for real progress tracking
   */
  async uploadBatchMedia(
    albumId: string,
    files: File[],
    onProgress?: (progress: number, fileIndex: number) => void,
  ): Promise<Media[]> {
    const token = getAuthToken();
    const results: Media[] = [];

    let i = 0;
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("albumId", albumId);

        const responseText = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${API_URL}/api/media/upload`);
          if (token) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          }
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
              const percent = Math.round((event.loaded / event.total) * 100);
              onProgress(percent, i);
            }
          };
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.responseText);
            } else {
              reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
          };
          xhr.onerror = () => reject(new Error(xhr.statusText));
          xhr.send(formData);
        });

        const parsed = JSON.parse(responseText);
        const media: Media = parsed.data ?? parsed;
        results.push(media);
        if (onProgress) onProgress(100, i);
      } catch (error) {
        console.error(`Failed to upload ${file.name}`, error);
      }
      i++;
    }

    return results;
  },
};
