"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Download, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ArticlesService, Article } from "@/services/articles.service";

export default function ArticleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const data = await ArticlesService.findAll();
      setArticles(data);
    } catch (err: any) {
      setError("Không thể tải danh sách bài viết");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast("Bạn có chắc chắn muốn xóa bài viết này?", {
      action: {
        label: "Xóa",
        onClick: async () => {
          try {
            await ArticlesService.remove(id);
            toast.success("Đã xóa bài viết thành công");
            fetchArticles();
          } catch (err: any) {
            toast.error("Xóa thất bại: " + err.message);
          }
        },
      },
      cancel: { label: "Hủy", onClick: () => {} },
    });
  };

  const filteredData = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Breadcrumb/Header outside the card */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Quản lý Tin tức
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link
                className="hover:text-blue-600 dark:hover:text-blue-500"
                href="/admin"
              >
                Trang chủ /
              </Link>
            </li>
            <li className="text-blue-600 dark:text-blue-500">Bài viết</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-[#1A222C]/70 backdrop-blur-xl shadow-sm overflow-hidden transition-all duration-300">
        {/* Card Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-slate-200 dark:border-slate-700 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Danh sách Bài viết
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Theo dõi, chỉnh sửa và đăng tin tức lên website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Xuất File
              <Download className="h-4 w-4" />
            </button>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:bg-blue-500 hover:-translate-y-0.5 transition-all"
            >
              <Plus className="h-4 w-4" />
              Thêm bài viết
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 bg-transparent border-b border-slate-100 dark:border-slate-700/50">
          <div className="relative w-full sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search
                className="h-4 w-4 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white/50 dark:bg-slate-800/50 font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300 border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-4">Bài viết</th>
                <th scope="col" className="px-6 py-4">Danh mục</th>
                <th scope="col" className="px-6 py-4">Trạng thái</th>
                <th scope="col" className="px-6 py-4">Lượt xem</th>
                <th scope="col" className="px-6 py-4">Ngày tạo</th>
                <th scope="col" className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-transparent">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    <div className="flex justify-center items-center gap-2">
                      <svg className="h-5 w-5 animate-spin text-blue-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    Không tìm thấy bài viết nào.
                  </td>
                </tr>
              ) : (
                filteredData.map((article) => (
                  <tr key={article.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-12 shrink-0 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                          {article.thumbnail ? (
                            <img src={article.thumbnail} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-slate-400">No Img</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-xs" title={article.title}>
                            {article.title}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                            /{article.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${article.category === 'NEWS' 
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}`}
                      >
                        {article.category === 'NEWS' ? 'TIN TỨC' : 'SỰ KIỆN'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.status === "PUBLISHED" ? (
                        <span className="text-emerald-500 font-medium">Đã xuất bản</span>
                      ) : article.status === "DRAFT" ? (
                        <span className="text-amber-500 font-medium">Bản nháp</span>
                      ) : (
                        <span className="text-slate-500 font-medium">Lưu trữ</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                      {article.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/articles/edit/${article.slug}`}>
                          <button className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors" title="Chỉnh sửa">
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
