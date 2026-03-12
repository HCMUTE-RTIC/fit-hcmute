"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronRight, Save, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { ArticlesService } from "@/services/articles.service";
import { MediaService } from "@/services/media.service";

// Dynamically import EditorJS
const EditorJSWrapper = dynamic(
  () => import("@/components/editor/EditorJSWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full animate-pulse rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
        <span className="text-slate-400 dark:text-slate-500 font-medium">
          Đang tải trình soạn thảo EditorJS...
        </span>
      </div>
    ),
  },
);

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "NEWS",
    status: "DRAFT",
    content: null as any,
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
  });
  const [thumbnail, setThumbnail] = useState<string>("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const article = await ArticlesService.findById(id);
        setFormData({
          title: article.title,
          slug: article.slug,
          category: article.category,
          status: article.status,
          content: article.content ? JSON.parse(article.content) : null,
          metaTitle: article.metaTitle ?? "",
          metaDescription: article.metaDescription ?? "",
          focusKeyword: article.focusKeywords ?? "",
        });
        setThumbnail(article.thumbnail ?? "");
      } catch (e: any) {
        toast.error("Không tải được bài viết: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

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

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailUploading(true);
    try {
      const response = await MediaService.uploadSingle(file);
      const media = Array.isArray(response.data) ? response.data[0] : response.data;
      setThumbnail(media.url);
    } catch {
      toast.error("Lỗi khi tải ảnh bìa lên");
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }
    setIsSaving(true);
    try {
      await ArticlesService.update(id, {
        title: formData.title,
        slug: formData.slug,
        summary: "",
        content: formData.content ? JSON.stringify(formData.content) : "",
        thumbnail,
        category: formData.category as "NEWS" | "EVENT",
        status: formData.status as "DRAFT" | "PUBLISHED",
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        focusKeywords: formData.focusKeyword,
      });
      toast.success("Bài viết đã được cập nhật!");
      router.push("/admin/articles");
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi cập nhật bài viết");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug:
        prev.slug === generateSlug(prev.title)
          ? generateSlug(newTitle)
          : prev.slug,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin relative flex h-8 w-8">
          <span className="absolute inline-flex h-full w-full rounded-full border-2 border-slate-300/20"></span>
          <span className="absolute inline-flex h-full w-full rounded-full border-2 border-blue-600 border-t-transparent"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Chỉnh sửa Bài Viết
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
                href="/admin/articles"
              >
                Bài viết
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-blue-600 dark:text-blue-500 font-medium">
              Chỉnh sửa
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Editor Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Nội dung chi tiết
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tiêu đề bài viết <span className="text-red-500">*</span>
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
                    fit.hcmute.edu.vn/
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
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-800">
                  <EditorJSWrapper
                    value={formData.content}
                    onChange={(val) =>
                      setFormData({ ...formData, content: val })
                    }
                  />
                </div>
              </div>
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
                    className={`text-xs ${formData.metaTitle.length > 60 ? "text-red-500" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {formData.metaTitle.length}/60 ký tự
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
                    className={`text-xs ${formData.metaDescription.length > 160 ? "text-red-500" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {formData.metaDescription.length}/160 ký tự
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Đoạn văn ngắn mô tả nội dung bài viết..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors resize-none"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDescription: e.target.value })
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
                  value={formData.focusKeyword}
                  onChange={(e) =>
                    setFormData({ ...formData, focusKeyword: e.target.value })
                  }
                />
              </div>

              {/* Google SERP Preview */}
              <div className="mt-8 p-4 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1A222C]">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                  Preview trên Google
                </p>
                <div className="max-w-xl">
                  <div className="text-sm text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                    https://fit.hcmute.edu.vn{" "}
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
                      "Đoạn mô tả ngắn gọn (snippet) sẽ hiển thị ở đây..."}
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
                  <option value="ARCHIVED">Lưu trữ (Archived)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Chuyên mục
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="NEWS">Tin tức</option>
                  <option value="EVENT">Sự kiện</option>
                </select>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/admin/articles")}
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Đang lưu..." : "Cập nhật"}
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Ảnh bìa (Thumbnail)
              </h3>
            </div>
            <div className="p-6">
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
              {thumbnail ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img src={thumbnail} alt="Thumbnail" className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={() => setThumbnail("")}
                    className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-6 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 group cursor-pointer"
                >
                  {thumbnailUploading ? (
                    <p className="text-sm text-slate-500">Đang tải lên...</p>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-slate-400 dark:text-slate-500 mb-3 group-hover:text-blue-500 transition-colors" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">
                        Kéo thả file ảnh hoặc{" "}
                        <span className="text-blue-600 dark:text-blue-500 cursor-pointer hover:underline">
                          nhấn vào đây
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 text-center">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
