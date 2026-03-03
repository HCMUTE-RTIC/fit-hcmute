"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import { GalleryService, MediaAlbum } from "../../../services/gallery.service";

export default function AlbumsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState<MediaAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const data = await GalleryService.getAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to load albums", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  const filteredData = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Breadcrumb/Header outside the card */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Thư viện Ảnh / Album
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
            <li className="text-blue-600 dark:text-blue-500">Albums</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-[#1A222C]/70 backdrop-blur-xl shadow-sm overflow-hidden transition-all duration-300">
        {/* Card Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-slate-200 dark:border-slate-700 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Danh sách Ảnh Sự kiện
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Quản lý các bộ ảnh (Album), cập nhật sự kiện hành trình 25 năm của
              Khoa.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/albums/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:bg-blue-500 hover:-translate-y-0.5 transition-all"
            >
              <Plus className="h-4 w-4" />
              Tạo Album mới
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
              placeholder="Tìm kiếm album..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white/50 dark:bg-slate-800/50 font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Table / Grid */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
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
                    Album
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Số lượng ảnh
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-transparent">
                {filteredData.map((album) => (
                  <tr
                    key={album.id}
                    className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600 dark:bg-slate-700"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                          {album.coverPhoto?.url ? (
                            <img
                              src={album.coverPhoto.url}
                              alt={album.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/admin/albums/${album.id}`}
                            className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1 max-w-sm"
                          >
                            {album.title}
                          </Link>
                          <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                            /{album.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                      {album._count?.media || 0} mục
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {album.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Đã xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(album.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        href={`/admin/albums/${album.id}`}
                        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 inline-flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
                        <p>Không tìm thấy album nào.</p>
                        <Link
                          href="/admin/albums/new"
                          className="mt-4 text-blue-600 hover:underline"
                        >
                          Tạo album đầu tiên
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
