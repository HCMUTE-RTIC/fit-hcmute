import { getAuthToken } from "../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface UserSnippet {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
}

export interface AuditLogItem {
    id: string;
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    oldValues: any | null;
    newValues: any | null;
    ipAddress: string | null;
    createdAt: string;
    user: UserSnippet;
}

export interface AuditLogsResponse {
    data: AuditLogItem[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const AuditLogsService = {
    getAuditLogs: async (page: number = 1, limit: number = 20): Promise<AuditLogsResponse> => {
        const token = getAuthToken();

        const res = await fetch(`${API_URL}/api/v1/audit-logs?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to fetch audit logs");
        }

        return res.json();
    },
};
