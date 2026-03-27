'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Heart, RefreshCw, Check, X, RotateCcw } from 'lucide-react';
import {
  FormsService,
  type FormSubmission,
  type SubmissionStatus,
} from '@/services/forms.service';

type StatusFilter = 'ALL' | SubmissionStatus;

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã duyệt',
  REJECTED: 'Từ chối',
};

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  PENDING: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300',
  APPROVED: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300',
  REJECTED: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
};

export default function LoiChucAdminPage() {
  const [formId, setFormId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('PENDING');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setLoading(true);
    setError('');
    try {
      const form = await FormsService.findOne('loi-chuc');
      setFormId(form.id);
      const data = await FormsService.getSubmissions(form.id);
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (submissionId: string, status: SubmissionStatus) => {
    setUpdatingId(submissionId);
    try {
      const updated = await FormsService.updateSubmissionStatus(submissionId, status);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === submissionId ? { ...s, status: updated.status } : s))
      );
      toast.success(
        status === 'APPROVED' ? '✅ Đã duyệt lời chúc!' : '❌ Đã từ chối lời chúc.'
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không thể cập nhật');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredSubmissions =
    statusFilter === 'ALL'
      ? submissions
      : submissions.filter((s) => s.status === statusFilter);

  const countByStatus = (f: StatusFilter) =>
    f === 'ALL' ? submissions.length : submissions.filter((s) => s.status === f).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/40">
            <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lời chúc</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Duyệt và quản lý lời chúc từ cộng đồng FIT
            </p>
          </div>
        </div>
        <button
          onClick={loadWishes}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors font-medium"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Làm mới
        </button>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="grid grid-cols-4 gap-4">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-xl p-4 text-left border transition-all ${
                statusFilter === f
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300'
              }`}
            >
              <p className={`text-2xl font-bold ${
                f === 'PENDING' ? 'text-yellow-600 dark:text-yellow-400' :
                f === 'APPROVED' ? 'text-green-600 dark:text-green-400' :
                f === 'REJECTED' ? 'text-red-500 dark:text-red-400' :
                'text-slate-900 dark:text-slate-100'
              }`}>
                {countByStatus(f)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {f === 'ALL' ? 'Tất cả' : STATUS_LABELS[f as SubmissionStatus]}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
            <p className="text-sm text-slate-500">
              {error.includes('not found') || error.includes('404')
                ? 'Hãy chạy lệnh seed để tạo form loi-chuc: pnpm exec prisma db seed'
                : 'Vui lòng thử lại.'}
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-16 text-center text-slate-500 dark:text-slate-400">
            {submissions.length === 0
              ? 'Chưa có lời chúc nào được gửi.'
              : `Không có lời chúc nào trong trạng thái "${statusFilter === 'ALL' ? 'Tất cả' : STATUS_LABELS[statusFilter as SubmissionStatus]}".`}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredSubmissions.map((sub) => {
              const name = sub.data.full_name || 'Ẩn danh';
              const email = sub.data.email || '';
              const message = sub.data.message || '';
              const graduationYear = sub.data.graduation_year;
              const attendEvent = sub.data.attend_event;
              const isUpdating = updatingId === sub.id;

              return (
                <div
                  key={sub.id}
                  className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {name}
                        </span>
                        {graduationYear && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                            {graduationYear}
                          </span>
                        )}
                        {attendEvent && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            attendEvent === 'Có'
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}>
                            {attendEvent === 'Có' ? '🎉 Tham dự' : 'Không tham dự'}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_STYLES[sub.status]}`}>
                          {STATUS_LABELS[sub.status]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{email}</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {message}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                        {new Date(sub.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>

                    {/* Right: actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      {sub.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(sub.id, 'APPROVED')}
                            disabled={isUpdating}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
                          >
                            <Check size={13} />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(sub.id, 'REJECTED')}
                            disabled={isUpdating}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/70 text-red-700 dark:text-red-300 rounded-lg font-semibold disabled:opacity-50 transition-colors"
                          >
                            <X size={13} />
                            Từ chối
                          </button>
                        </>
                      )}
                      {sub.status === 'APPROVED' && (
                        <button
                          onClick={() => handleStatusUpdate(sub.id, 'REJECTED')}
                          disabled={isUpdating}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium disabled:opacity-50 transition-colors"
                        >
                          <X size={13} />
                          Thu hồi
                        </button>
                      )}
                      {sub.status === 'REJECTED' && (
                        <button
                          onClick={() => handleStatusUpdate(sub.id, 'APPROVED')}
                          disabled={isUpdating}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium disabled:opacity-50 transition-colors"
                        >
                          <RotateCcw size={13} />
                          Duyệt lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
