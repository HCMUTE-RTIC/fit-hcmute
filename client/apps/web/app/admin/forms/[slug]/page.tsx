'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders } from '@/lib/auth';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  order: number;
}

interface FormDetails {
  id: string;
  title: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: string;
  fields: FormField[];
  event?: {
    title: string;
  };
  _count?: {
    submissions: number;
  };
}

export default function FormDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [form, setForm] = useState<FormDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchForm();
  }, [slug]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/forms/${slug}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Không tìm thấy form');
          return;
        }
        if (response.status === 401 || response.status === 403) {
          setError('Không có quyền xem form này');
          return;
        }
        throw new Error('Failed to fetch form');
      }
      
      const data = await response.json();
      setForm(data);
      setError('');
    } catch (err) {
      console.error('Error fetching form:', err);
      if (!error) {
        setError('Không thể tải thông tin form');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Không tìm thấy form'}</p>
        <Link href="/admin/forms" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{form.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Chi tiết form và preview</p>
        </div>
        <Link
          href="/admin/forms"
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-900 dark:text-slate-100 transition-colors"
        >
          ← Quay lại
        </Link>
      </div>

      {/* Form Info */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Thông tin Form</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Mô tả</label>
            <p className="mt-1 text-slate-900 dark:text-slate-100">{form.description || 'Không có mô tả'}</p>
          </div>
          
          {form.event && (
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Sự kiện liên kết</label>
              <p className="mt-1 text-blue-600 dark:text-blue-400 font-medium">{form.event.title}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Trạng thái</label>
            <p className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  form.active
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
                }`}
              >
                {form.active ? 'Hoạt động' : 'Tạm dừng'}
              </span>
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Slug</label>
            <p className="mt-1 font-mono text-sm text-slate-900 dark:text-slate-100">{form.slug}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Số lượng field</label>
            <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{form.fields.length}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Ngày tạo</label>
            <p className="mt-1 text-slate-900 dark:text-slate-100">
              {new Date(form.createdAt).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Danh sách Fields ({form.fields.length})
        </h2>
        
        <div className="space-y-3">
          {form.fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">#{index + 1}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{field.label}</span>
                  {field.required && (
                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded font-semibold">
                      Required
                    </span>
                  )}
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-semibold">
                  {field.type}
                </span>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Field name: <span className="font-mono text-slate-900 dark:text-slate-100">{field.name}</span>
              </div>

              {field.options && field.options.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Options:</label>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {field.options.map((option, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Preview Form</h2>
        
        <div className="max-w-2xl space-y-5">
          {form.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'TEXT' || field.type === 'EMAIL' || field.type === 'PHONE' ? (
                <input
                  type={field.type === 'EMAIL' ? 'email' : field.type === 'PHONE' ? 'tel' : 'text'}
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                  placeholder={`Nhập ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'TEXTAREA' ? (
                <textarea
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                  rows={4}
                  placeholder={`Nhập ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'SELECT' ? (
                <select disabled className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                  <option>-- Chọn --</option>
                  {field.options?.map((option, i) => (
                    <option key={i}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'RADIO' ? (
                <div className="space-y-2">
                  {field.options?.map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" disabled name={field.name} className="text-blue-600" />
                      <label className="text-sm text-slate-700 dark:text-slate-300">{option}</label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'CHECKBOX' ? (
                <div className="flex items-center gap-2">
                  <input type="checkbox" disabled className="rounded text-blue-600" />
                  <label className="text-sm text-slate-700 dark:text-slate-300">{field.label}</label>
                </div>
              ) : field.type === 'FILE' ? (
                <input
                  type="file"
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                />
              ) : null}
            </div>
          ))}

          <div className="pt-4">
            <button
              disabled
              className="w-full px-6 py-3 bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 rounded-lg font-medium cursor-not-allowed"
            >
              Submit (Preview mode)
            </button>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Lưu ý:</strong> Để xem submissions và export Excel, cần implement thêm API backend.
          Hiện tại chỉ có chức năng quản lý form definition.
        </p>
      </div>
    </div>
  );
}
