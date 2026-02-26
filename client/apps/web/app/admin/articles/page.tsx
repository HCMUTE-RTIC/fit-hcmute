"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Download, MoreVertical } from "lucide-react";

type Article = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  author: string;
  createdAt: string;
  views: number;
  image?: string;
};

const dummyData: Article[] = [
  {
    id: "1",
    title: "Chào mừng kỷ niệm 25 năm thành lập khoa CNTT",
    slug: "chao-mung-ky-niem-25-nam",
    status: "PUBLISHED",
    author: "Admin",
    createdAt: "25 Th02, 2026",
    views: 1250,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "Hội thảo Công nghệ Trí tuệ Nhân tạo 2026",
    slug: "hoi-thao-ai-2026",
    status: "DRAFT",
    author: "Editor 1",
    createdAt: "26 Th02, 2026",
    views: 0,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "Danh sách sinh viên tiêu biểu niên khóa 2022-2026",
    slug: "sinh-vien-tieu-bieu-2026",
    status: "PUBLISHED",
    author: "Admin",
    createdAt: "27 Th02, 2026",
    views: 342,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop",
  },
];

export default function ArticleList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = dummyData.filter((article) =>
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

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden transition-colors duration-300">
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
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Thêm bài viết
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 bg-white dark:bg-[#24303F] border-b border-slate-100 dark:border-slate-700/50">
          <div className="relative w-full sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search
                className="h-4 w-4 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-transparent py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-[#24303F] font-medium transition-colors">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300 border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600 dark:bg-slate-700"
                  />
                </th>
                <th scope="col" className="px-6 py-4">
                  Bài viết
                </th>
                <th scope="col" className="px-6 py-4">
                  Danh mục
                </th>
                <th scope="col" className="px-6 py-4">
                  Tác giả
                </th>
                <th scope="col" className="px-6 py-4">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-4">
                  Ngày tạo
                </th>
                <th scope="col" className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-white dark:bg-[#24303F]">
              {filteredData.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600 dark:bg-slate-700"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-12 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        {article.image && (
                          <img
                            src={article.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-xs">
                          {article.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                          /{article.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">Tin tức</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.status === "PUBLISHED" ? (
                      <span className="text-emerald-500 font-medium">
                        Đã xuất bản
                      </span>
                    ) : (
                      <span className="text-amber-500 font-medium">
                        Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    Không tìm thấy bài viết nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
