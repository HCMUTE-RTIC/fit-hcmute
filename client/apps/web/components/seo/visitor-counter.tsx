import { Users } from "lucide-react";

async function getUmamiToken(): Promise<string | null> {
  const apiUrl = process.env.UMAMI_API_URL;
  const username = process.env.UMAMI_USERNAME;
  const password = process.env.UMAMI_PASSWORD;

  if (!apiUrl || !username || !password) return null;

  try {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch {
    return null;
  }
}

async function getVisitorStats() {
  const apiUrl = process.env.UMAMI_API_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!apiUrl || !websiteId) return null;

  const token = await getUmamiToken();
  if (!token) return null;

  try {
    const res = await fetch(
      `${apiUrl}/api/websites/${websiteId}/stats?startAt=0&endAt=${Date.now()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      visitors: data.visitors?.value ?? 0,
      pageviews: data.pageviews?.value ?? 0,
    };
  } catch {
    return null;
  }
}

export async function VisitorCounter() {
  const stats = await getVisitorStats();

  if (!stats) return null;

  return (
    <div
      className="mt-4 flex items-center gap-2 text-sm"
      style={{ color: "var(--color-text-gray)" }}
    >
      <Users size={15} className="shrink-0" />
      <span>
        <span className="font-semibold" style={{ color: "var(--color-primary-700)" }}>
          {stats.visitors.toLocaleString("vi-VN")}
        </span>{" "}
        lượt truy cập
      </span>
    </div>
  );
}
