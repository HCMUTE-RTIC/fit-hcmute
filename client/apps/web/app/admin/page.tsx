import { Activity, Users, Image as ImageIcon, FileText } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Tổng số bài viết", value: "124", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Lượt truy cập mới", value: "8,234", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Album ảnh", value: "45", icon: ImageIcon, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Tài khoản", value: "12", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          Tổng quan về hệ thống FIT CMS.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-[#1A222C]/50 p-6 backdrop-blur-xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Subtle Gradient Glow in Background */}
            <div className="absolute -inset-0.5 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl z-0"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</h3>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color} shadow-inner`}>
                <item.icon className="h-6 w-6" />
              </div>
            </div>
            
            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
