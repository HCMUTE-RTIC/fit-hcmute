'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FormsService, type FormDefinition, type FormField } from '@/services/forms.service';

export default function PublicFormPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [form, setForm] = useState<FormDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    FormsService.findOne(slug)
      .then((data) => { setForm(data); setLoading(false); })
      .catch((err) => { setError(err.message || 'Không tìm thấy form'); setLoading(false); });
  }, [slug]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    // Validate required fields
    for (const field of form.fields) {
      if (field.required && !values[field.name]) {
        setSubmitError(`Vui lòng điền "${field.label}"`);
        return;
      }
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      await FormsService.submit(slug, values);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Gửi form thất bại, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">{error || 'Không tìm thấy form'}</p>
          <p className="text-slate-500 text-sm">Vui lòng kiểm tra lại đường dẫn.</p>
        </div>
      </div>
    );
  }

  if (!form.active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-700 text-lg font-medium">Form đã đóng</p>
          <p className="text-slate-500 text-sm mt-1">Form đăng ký này hiện không còn nhận phản hồi.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h2>
          <p className="text-slate-600">
            Cảm ơn bạn đã đăng ký <strong>{form.title}</strong>. Chúng tôi sẽ liên hệ xác nhận qua email sớm nhất.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">{form.title}</h1>
          {form.description && (
            <p className="mt-3 text-slate-600 leading-relaxed">{form.description}</p>
          )}
          {form.event && (
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {form.event.title}
            </span>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6"
        >
          {form.fields
            .sort((a, b) => a.order - b.order)
            .map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={values[field.name] ?? ''}
                onChange={(val) => handleChange(field.name, val)}
              />
            ))}

          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
          >
            {submitting ? 'Đang gửi...' : 'Gửi đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  const labelEl = (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {field.label}
      {field.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    'w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  if (field.type === 'TEXT' || field.type === 'EMAIL' || field.type === 'PHONE') {
    return (
      <div>
        {labelEl}
        <input
          type={field.type === 'EMAIL' ? 'email' : field.type === 'PHONE' ? 'tel' : 'text'}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Nhập ${field.label.toLowerCase()}`}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === 'TEXTAREA') {
    return (
      <div>
        {labelEl}
        <textarea
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={`Nhập ${field.label.toLowerCase()}`}
          className={`${inputClass} resize-none`}
        />
      </div>
    );
  }

  if (field.type === 'SELECT') {
    return (
      <div>
        {labelEl}
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">-- Chọn --</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'RADIO') {
    return (
      <div>
        {labelEl}
        <div className="space-y-2">
          {field.options?.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name={field.name}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                required={field.required}
                className="text-blue-600 w-4 h-4"
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'CHECKBOX') {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : '')}
          className="rounded text-blue-600 w-4 h-4"
        />
        <span className="text-sm font-medium text-slate-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
    );
  }

  if (field.type === 'FILE') {
    return (
      <div>
        {labelEl}
        <input
          type="file"
          required={field.required}
          onChange={(e) => onChange(e.target.files?.[0]?.name ?? '')}
          className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    );
  }

  return null;
}
