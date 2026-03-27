import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const SettingsService = {
  getAll: async (): Promise<Record<string, string>> => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, { cache: "no-store" });
      if (!res.ok) return {};
      return res.json();
    } catch {
      return {};
    }
  },

  update: async (data: Record<string, string>): Promise<void> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể cập nhật cấu hình");
    }
  },
};
