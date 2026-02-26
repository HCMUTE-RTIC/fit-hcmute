export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tổng quan về hệ thống FIT CMS.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {[
          "Tổng số bài viết",
          "Lượt truy cập mới",
          "Album ảnh",
          "Đăng ký sự kiện",
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-sm font-medium text-slate-500">{item}</h3>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {Math.floor(Math.random() * 100) + 10}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
