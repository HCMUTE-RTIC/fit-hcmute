'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { FormsService, type FormDefinition } from '@/services/forms.service';

export default function AdminFormsListPage() {
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await FormsService.findAll();
      setForms(data);
      setError('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không thể kết nối tới server';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc muốn xóa form "${title}"?`)) return;
    try {
      await FormsService.remove(id);
      toast.success('Xóa form thành công');
      fetchForms();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi xóa form');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Quản lý Forms</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Tạo và quản lý form động cho sự kiện</p>
        </div>
        <Link
          href="/admin/forms/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          + Tạo Form Mới
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Đang tải...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-600 dark:text-red-400">{error}</div>
        ) : forms.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">Chưa có form nào</p>
            <Link
              href="/admin/forms/new"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Tạo form đầu tiên
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Form
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Sự kiện
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <Link
                          href={`/admin/forms/${form.slug}`}
                          className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {form.title}
                        </Link>
                        {form.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {form.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {form.event ? (
                        <span className="text-blue-600 dark:text-blue-400">{form.event.title}</span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {form._count?.submissions ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          form.active
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {form.active ? 'Hoạt động' : 'Tạm dừng'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {new Date(form.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/forms/${form.slug}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                        >
                          Xem
                        </Link>
                        <button
                          onClick={() => deleteForm(form.id, form.title)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Tổng Forms</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">{forms.length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Forms Hoạt động</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {forms.filter((f) => f.active).length}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Tổng Submissions</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {forms.reduce((sum, f) => sum + (f._count?.submissions ?? 0), 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
