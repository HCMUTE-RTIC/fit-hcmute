"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Save, Image as ImageIcon, Trash2 } from "lucide-react";
import { GalleryService, MediaAlbum, Media } from "@/services/gallery.service";
import BatchUpload from "@/components/admin/BatchUpload";

export default function AlbumEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<MediaAlbum>>({
    title: "",
    slug: "",
    description: "",
    status: "DRAFT",
    metaTitle: "",
    metaDescription: "",
  });

  const [focusKeyword, setFocusKeyword] = useState("");
  const [albumMedia, setAlbumMedia] = useState<Media[]>([]);

  useEffect(() => {
    async function fetchAlbum() {
      if (isNew) return;
      try {
        setLoading(true);
        const data = await GalleryService.getAlbumById(id);
        if (data) {
          setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description || "",
            status: data.status,
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            coverPhotoId: data.coverPhotoId,
          });
          // Assuming an endpoint to fetch media by album id exists, mock setting empty for now
          // if there is existing media, populate `setAlbumMedia` here.
        }
      } catch (error) {
        console.error("Failed to load album", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbum();
  }, [id, isNew]);

  // Basic auto-generate slug for Vietnamese
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      // Only auto-update slug if user hasn't manually edited it significantly
      slug:
        prev.slug === generateSlug(prev.title || "") || !prev.slug
          ? generateSlug(newTitle)
          : prev.slug,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isNew) {
        await GalleryService.createAlbum(formData);
        // After creating, typical flow would route to the new ID or list. Let's go to list.
        router.push("/admin/albums");
      } else {
        await GalleryService.updateAlbum(id, formData);
        router.push("/admin/albums");
      }
    } catch (error) {
      console.error("Failed to save album", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUploadComplete = (newMedia: Media[]) => {
    setAlbumMedia((prev) => [...prev, ...newMedia]);
    // In a real app, you might auto-set the cover photo if it's the first photo
    if (!formData.coverPhotoId && newMedia.length > 0) {
      const firstMedia = newMedia[0];
      if (firstMedia) {
        setFormData((prev) => ({ ...prev, coverPhotoId: firstMedia.id }));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isNew ? "Thêm Album Mới" : "Chỉnh sửa Album"}
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link
                className="hover:text-blue-600 dark:hover:text-blue-500"
                href="/admin"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                className="hover:text-blue-600 dark:hover:text-blue-500"
                href="/admin/albums"
              >
                Albums
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-blue-600 dark:text-blue-500 font-medium">
              {isNew ? "Thêm mới" : formData.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* General Information Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Thông tin Album
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tiêu đề Album <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  value={formData.title}
                  onChange={handleTitleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Đường dẫn (Slug)
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-4 py-2.5 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                    fit.hcmute.edu.vn/gallery/
                  </span>
                  <input
                    type="text"
                    className="flex-1 rounded-none rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={4}
                  placeholder="Mô tả về sự kiện, buổi lễ..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Batch Upload Widget */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Quản lý Hình ảnh (Batch Upload)
              </h3>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {albumMedia.length} mục
              </span>
            </div>
            <div className="p-6">
              {!isNew ? (
                <BatchUpload
                  albumId={id}
                  onUploadComplete={handleUploadComplete}
                  existingMedia={albumMedia}
                />
              ) : (
                <div className="py-10 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Vui lòng lưu Album lần đầu để có thể tải ảnh lên.</p>
                  <button
                    onClick={handleSave}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
                  >
                    Lưu cấu trúc Album ngay
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SEO Meta Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Cấu hình SEO Meta
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tối ưu hóa hiển thị trên Google Search
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Meta Title
                  </label>
                  <span
                    className={`text-xs ${(formData.metaTitle?.length || 0) > 60 ? "text-red-500" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {formData.metaTitle?.length || 0}/60 ký tự
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Tiêu đề hiển thị trên kết quả tìm kiếm..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Meta Description
                  </label>
                  <span
                    className={`text-xs ${(formData.metaDescription?.length || 0) > 160 ? "text-red-500" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {formData.metaDescription?.length || 0}/160 ký tự
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Đoạn văn ngắn mô tả nội dung bài viết..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors resize-none"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  placeholder="VD: ky niem 25 nam cntt"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                />
              </div>

              {/* Google SERP Preview */}
              <div className="mt-8 p-4 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1A222C]">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                  Preview trên Google
                </p>
                <div className="max-w-xl">
                  <div className="text-sm text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                    https://fit.hcmute.edu.vn/gallery/
                    <span className="text-slate-400">›</span>{" "}
                    {formData.slug || "duong-dan"}
                  </div>
                  <div className="text-xl text-blue-700 dark:text-blue-400 font-medium hover:underline cursor-pointer truncate mt-1">
                    {formData.metaTitle ||
                      formData.title ||
                      "Tiêu đề hiển thị trên công cụ tìm kiếm"}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {formData.metaDescription ||
                      "Đoạn mô tả ngắn gọn (snippet) sẽ hiển thị ở đây. Bạn nên viết mô tả hấp dẫn và chứa từ khóa chính..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Publish Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Xuất bản
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Trạng thái
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                >
                  <option value="DRAFT">Lưu Nháp (Draft)</option>
                  <option value="PUBLISHED">Công khai (Published)</option>
                </select>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/admin/albums")}
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  Thoát
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
