import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface Media {
  id: string;
  albumId?: string;
  key: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  category: "IMAGE" | "VIDEO" | "PDF_YEARBOOK" | "ATTACHMENT";
  uploadedBy: string;
  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: Media | Media[];
  errorCode: string | null;
}

export const MediaService = {
  uploadSingle: async (file: File, albumId?: string): Promise<UploadResponse> => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("file", file);
    if (albumId) {
      formData.append("albumId", albumId);
    }

    const res = await fetch(`${API_URL}/api/media/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to upload file");
    }

    return res.json();
  },

  uploadBatch: async (files: File[], albumId?: string): Promise<UploadResponse> => {
    const token = getAuthToken();
    const formData = new FormData();
    
    files.forEach((file) => {
        formData.append("files", file);
    });

    if (albumId) {
      formData.append("albumId", albumId);
    }

    const res = await fetch(`${API_URL}/api/media/upload-batch`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to upload files");
    }

    return res.json();
  },
};
