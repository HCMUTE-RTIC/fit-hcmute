"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronRight, Save, Image as ImageIcon, Check, X } from "lucide-react";

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

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "news",
    status: "DRAFT",
    content: null,
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
  });

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
      // Only auto-update slug if user hasn't manually edited it
      slug:
        prev.slug === generateSlug(prev.title)
          ? generateSlug(newTitle)
          : prev.slug,
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Thêm Bài Viết Mới
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
              Thêm mới
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
                  <option value="news">Tin tức - Sự kiện</option>
                  <option value="academic">Học thuật</option>
                  <option value="alumni">Chuyên mục Cựu Sinh Viên</option>
                </select>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <button className="flex-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  Hủy
                </button>
                <button className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
                  <Save className="h-4 w-4" />
                  Đăng tải
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
              <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-6 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 group">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
