'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  FormsService,
  type FormDefinition,
  type FormSubmission,
  type FieldType,
} from '@/services/forms.service';

type Tab = 'info' | 'submissions';

interface EditableField {
  id?: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string[];
  order: number;
}

const FIELD_TYPES: FieldType[] = ['TEXT', 'TEXTAREA', 'EMAIL', 'PHONE', 'SELECT', 'RADIO', 'CHECKBOX', 'FILE'];

function toSnakeCase(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

export default function FormDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [form, setForm] = useState<FormDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('info');

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editFields, setEditFields] = useState<EditableField[]>([]);
  const [saving, setSaving] = useState(false);

  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    fetchForm();
  }, [slug]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      const data = await FormsService.findOne(slug);
      setForm(data);
      initEditState(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải thông tin form');
    } finally {
      setLoading(false);
    }
  };

  const initEditState = (data: FormDefinition) => {
    setEditTitle(data.title);
    setEditDescription(data.description ?? '');
    setEditActive(data.active);
    setEditFields(
      data.fields.map((f) => ({
        id: f.id,
        name: f.name,
        label: f.label,
        type: f.type,
        required: f.required,
        options: f.options ?? [],
        order: f.order,
      }))
    );
  };

  const fetchSubmissions = async () => {
    if (!form) return;
    setSubLoading(true);
    try {
      const data = await FormsService.getSubmissions(form.id);
      setSubmissions(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không thể tải submissions');
    } finally {
      setSubLoading(false);
    }
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    if (t === 'submissions' && submissions.length === 0) {
      fetchSubmissions();
    }
  };

  const handleSave = async () => {
    if (!form) return;
    if (editFields.length === 0) {
      toast.error('Form phải có ít nhất 1 field');
      return;
    }
    for (const f of editFields) {
      if (!f.label.trim()) {
        toast.error('Tên hiển thị (Label) không được để trống');
        return;
      }
    }
    setSaving(true);
    try {
      const updated = await FormsService.update(form.id, {
        title: editTitle,
        description: editDescription,
        active: editActive,
        fields: editFields.map((f, i) => ({
          name: f.name,
          label: f.label,
          type: f.type,
          required: f.required,
          options: f.options,
          order: i,
        })),
      });
      setForm((prev) => prev ? { ...prev, ...updated, fields: updated.fields ?? prev.fields } : updated);
      setEditing(false);
      toast.success('Cập nhật form thành công!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi cập nhật form');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (!form) return;
    initEditState(form);
    setEditing(false);
  };

  const updateEditField = (index: number, updates: Partial<EditableField>) => {
    setEditFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const addField = () => {
    setEditFields((prev) => [
      ...prev,
      { name: `field_${Date.now()}`, label: '', type: 'TEXT', required: false, options: [], order: prev.length },
    ]);
  };

  const removeField = (index: number) => {
    setEditFields((prev) => prev.filter((_, i) => i !== index));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    setEditFields((prev) => {
      const arr = [...prev];
      const swap = direction === 'up' ? index - 1 : index + 1;
      if (swap < 0 || swap >= arr.length) return arr;
      const temp = arr[index];
      arr[index] = arr[swap] as EditableField;
      arr[swap] = temp as EditableField;
      return arr;
    });
  };

  const exportCSV = () => {
    if (!form || submissions.length === 0) return;
    const cols = form.fields.slice().sort((a, b) => a.order - b.order).map((f) => ({ name: f.name, label: f.label }));
    const headers = ['#', ...cols.map((f) => f.label), 'Thời gian gửi'];
    const rows = submissions.map((sub, idx) => [
      String(idx + 1),
      ...cols.map((f) => sub.data[f.name] ?? ''),
      new Date(sub.createdAt).toLocaleString('vi-VN'),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${form.slug}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Không tìm thấy form'}</p>
        <Link href="/admin/forms" className="text-blue-600 hover:text-blue-700">← Quay lại danh sách</Link>
      </div>
    );
  }

  const fieldNames = form.fields.slice().sort((a, b) => a.order - b.order).map((f) => ({ name: f.name, label: f.label }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{form.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Chi tiết form và quản lý submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dang-ky/${form.slug}`}
            target="_blank"
            className="px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 transition-colors"
          >
            🔗 Xem trang công khai
          </Link>
          <Link
            href="/admin/forms"
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-900 dark:text-slate-100 transition-colors"
          >
            ← Quay lại
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex gap-6">
          {(['info', 'submissions'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {t === 'info' ? 'Thông tin & Fields' : `Submissions (${form._count?.submissions ?? submissions.length})`}
            </button>
          ))}
        </nav>
      </div>

      {/* ─── TAB: Info ─── */}
      {tab === 'info' && (
        <div className="space-y-6">
          {/* Form Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Thông tin Form</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium transition-colors"
                >
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition-colors"
                  >
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tên Form</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mô tả</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Trạng thái</label>
                  <button
                    type="button"
                    onClick={() => setEditActive(!editActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editActive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${editActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-sm font-medium ${editActive ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                    {editActive ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>
              </div>
            ) : (
              <>
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${form.active ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'}`}>
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
                    <p className="mt-1 text-slate-900 dark:text-slate-100">{new Date(form.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Fields */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Danh sách Fields ({editing ? editFields.length : form.fields.length})
              </h2>
              {editing && (
                <button
                  onClick={addField}
                  className="px-3 py-1.5 text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 font-medium transition-colors"
                >
                  + Thêm Field
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                {editFields.map((field, index) => (
                  <FieldEditor
                    key={field.id ?? `new-${index}`}
                    field={field}
                    index={index}
                    total={editFields.length}
                    onChange={(updates) => updateEditField(index, updates)}
                    onRemove={() => removeField(index)}
                    onMove={(dir) => moveField(index, dir)}
                  />
                ))}
                {editFields.length === 0 && (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                    Chưa có field nào. Nhấn &quot;+ Thêm Field&quot; để bắt đầu.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {form.fields.map((field, index) => (
                  <div key={field.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">#{index + 1}</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{field.label}</span>
                        {field.required && (
                          <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded font-semibold">Required</span>
                        )}
                      </div>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-semibold">{field.type}</span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Field name: <span className="font-mono text-slate-900 dark:text-slate-100">{field.name}</span>
                    </div>
                    {field.options && field.options.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Options: </span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {field.options.map((opt, i) => (
                            <span key={i} className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300">{opt}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB: Submissions ─── */}
      {tab === 'submissions' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Danh sách người đã gửi ({submissions.length})
            </h2>
            <div className="flex gap-2">
              {submissions.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  ↓ Export CSV
                </button>
              )}
              <button
                onClick={fetchSubmissions}
                disabled={subLoading}
                className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors"
              >
                {subLoading ? 'Đang tải...' : '↻ Làm mới'}
              </button>
            </div>
          </div>

          {subLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">Đang tải...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">Chưa có ai gửi form này.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">#</th>
                    {fieldNames.map((f) => (
                      <th key={f.name} className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                        {f.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {submissions.map((sub, idx) => (
                    <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{idx + 1}</td>
                      {fieldNames.map((f) => (
                        <td key={f.name} className="px-4 py-3 text-slate-900 dark:text-slate-100 max-w-[200px] truncate">
                          {sub.data[f.name] ?? <span className="text-slate-400 italic">—</span>}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleString('vi-VN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface FieldEditorProps {
  field: EditableField;
  index: number;
  total: number;
  onChange: (updates: Partial<EditableField>) => void;
  onRemove: () => void;
  onMove: (dir: 'up' | 'down') => void;
}

function FieldEditor({ field, index, total, onChange, onRemove, onMove }: FieldEditorProps) {
  const hasOptions = field.type === 'SELECT' || field.type === 'RADIO';

  return (
    <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-6 shrink-0">#{index + 1}</span>
        <div className="flex flex-col gap-0.5 shrink-0">
          <button onClick={() => onMove('up')} disabled={index === 0} className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed leading-none text-xs">▲</button>
          <button onClick={() => onMove('down')} disabled={index === total - 1} className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed leading-none text-xs">▼</button>
        </div>
        <input
          type="text"
          value={field.label}
          onChange={(e) => {
            const label = e.target.value;
            if (!field.id) {
              onChange({ label, name: toSnakeCase(label) || `field_${Date.now()}` });
            } else {
              onChange({ label });
            }
          }}
          placeholder="Tên hiển thị (Label)"
          className="flex-1 px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={field.type}
          onChange={(e) => onChange({ type: e.target.value as FieldType })}
          className="px-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
        >
          {FIELD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <label className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 cursor-pointer whitespace-nowrap shrink-0">
          <input type="checkbox" checked={field.required} onChange={(e) => onChange({ required: e.target.checked })} className="rounded text-blue-600" />
          Bắt buộc
        </label>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors shrink-0" title="Xóa field">✕</button>
      </div>
      <div className="ml-14 mt-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">name: {field.name}</div>
      {hasOptions && (
        <div className="ml-14 mt-2">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Các lựa chọn (mỗi dòng một lựa chọn)</label>
          <textarea
            rows={Math.max(2, field.options.length + 1)}
            value={field.options.join('\n')}
            onChange={(e) => onChange({ options: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            placeholder={'Lựa chọn 1\nLựa chọn 2\nLựa chọn 3'}
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      )}
    </div>
  );
}
