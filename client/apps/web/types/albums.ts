export interface Media {
  id: string;
  albumId: string | null;
  key: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  category: string;
  uploadedBy: string;
  createdAt: string;
}

export interface MediaAlbum {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverPhotoId: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  medias?: Media[];
}
