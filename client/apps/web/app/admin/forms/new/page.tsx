'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders } from '@/lib/auth';

// Các loại field mà form có thể có
type FieldType = 'TEXT' | 'TEXTAREA' | 'EMAIL' | 'PHONE' | 'SELECT' | 'RADIO' | 'CHECKBOX' | 'FILE';

// Cấu trúc của 1 field trong form
interface FormField {
  id: string;         // ID tạm để quản lý trên client
  name: string;       // Tên key để lưu data (vd: "full_name")
  label: string;      // Nhãn hiển thị cho người dùng
  type: FieldType;    // Loại input
  required: boolean;  // Bắt buộc hay không
  options?: string[]; // Danh sách options (cho SELECT, RADIO)
  order: number;      // Thứ tự hiển thị
}

export default function FormBuilderPage() {
  const router = useRouter();
  
  // State quản lý form
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [saving, setSaving] = useState(false);

  // Danh sách các loại field có thể thêm
  const fieldTypes: { value: FieldType; label: string; icon: string }[] = [
    { value: 'TEXT', label: 'Text', icon: '📝' },
    { value: 'TEXTAREA', label: 'Textarea', icon: '📄' },
    { value: 'EMAIL', label: 'Email', icon: '📧' },
    { value: 'PHONE', label: 'Phone', icon: '📱' },
    { value: 'SELECT', label: 'Dropdown', icon: '📋' },
    { value: 'RADIO', label: 'Radio', icon: '🔘' },
    { value: 'CHECKBOX', label: 'Checkbox', icon: '☑️' },
    { value: 'FILE', label: 'File Upload', icon: '📎' },
  ];

  // Thêm field mới vào form
  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      name: `field_${fields.length + 1}`,
      label: `Field ${fields.length + 1}`,
      type,
      required: false,
      options: type === 'SELECT' || type === 'RADIO' ? ['Option 1', 'Option 2'] : undefined,
      order: fields.length,
    };
    setFields([...fields, newField]);
  };

  // Cập nhật properties của 1 field
  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  // Xóa field khỏi form
  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  // Di chuyển field lên/xuống (thay đổi thứ tự)
  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    
    // Hoán đổi vị trí 2 field (type-safe)
    const currentField = newFields[index];
    const targetField = newFields[targetIndex];
    
    if (currentField && targetField) {
      newFields[index] = targetField;
      newFields[targetIndex] = currentField;
    }
    
    // Cập nhật lại order cho tất cả fields
    setFields(newFields.map((field, i) => ({ ...field, order: i })));
  };

  // Gửi form lên API backend
  const handlePublish = async () => {
    // Validate form title
    if (!formTitle.trim()) {
      alert('Vui lòng nhập tên form');
      return;
    }

    // Validate ít nhất 1 field
    if (fields.length === 0) {
      alert('Vui lòng thêm ít nhất 1 field');
      return;
    }

    // Chuẩn bị data (loại bỏ id client-side)
    const formData = {
      title: formTitle,
      description: formDescription,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fields: fields.map(({ id, ...field }) => field),
    };

    try {
      setSaving(true);
      const response = await fetch('http://localhost:3001/api/forms', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Tạo form thành công!');
        router.push(`/admin/forms/${result.slug}`);
      } else {
        if (response.status === 401 || response.status === 403) {
          alert('Không có quyền tạo form. Cần đăng nhập với quyền SUPER_ADMIN');
          return;
        }
        const error = await response.json().catch(() => null);
        alert(`Lỗi: ${error?.message || 'Không thể tạo form'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể kết nối tới server. Vui lòng kiểm tra backend đang chạy.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Form Builder</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Tạo form động với các field tùy chỉnh</p>
        </div>
        <Link
          href="/admin/forms"
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
        >
          ← Quay lại
        </Link>
      </div>

      {/* Form Info */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Thông tin Form</h2>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tên Form <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            placeholder="VD: Đăng ký tham dự Lễ kỷ niệm 25 năm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mô tả</label>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            rows={3}
            placeholder="Mô tả ngắn về form này..."
          />
        </div>
      </div>

      {/* Field Palette */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Thêm Field</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fieldTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => addField(type.value)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors font-medium text-sm text-slate-900 dark:text-slate-100"
            >
              <span className="text-lg">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Canvas */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Form Fields ({fields.length})
          </h2>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">Chưa có field nào. Click vào các nút ở trên để thêm field.</p>
          </div>
          ) : (
            <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-shadow"
              >
                {/* Field Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded">
                      {field.type}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Field #{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveField(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30 text-slate-700 dark:text-slate-300"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveField(index, 'down')}
                      disabled={index === fields.length - 1}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30 text-slate-700 dark:text-slate-300"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeField(field.id)}
                      className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-sm font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                {/* Field Properties */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Field Name (key)
                    </label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(field.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      placeholder="field_name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Label hiển thị
                    </label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      placeholder="Nhãn hiển thị"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    className="rounded"
                    id={`required-${field.id}`}
                  />
                  <label htmlFor={`required-${field.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Bắt buộc nhập
                  </label>
                </div>

                {/* Options for SELECT/RADIO */}
                {(field.type === 'SELECT' || field.type === 'RADIO') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Options (phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={field.options?.join(', ') || ''}
                      onChange={(e) => updateField(field.id, {
                        options: e.target.value.split(',').map(o => o.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-900 dark:text-slate-100 transition-colors"
          disabled={saving}
        >
          Hủy
        </button>
        <button
          onClick={handlePublish}
          disabled={!formTitle || fields.length === 0 || saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {saving ? 'Đang lưu...' : 'Publish Form'}
        </button>
      </div>
    </div>
  );
}
