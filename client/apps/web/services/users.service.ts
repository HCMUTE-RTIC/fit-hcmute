import { getAuthToken } from "../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface UserItem {
    id: string;
    email: string;
    name: string;
    role: "SUPER_ADMIN" | "EDITOR" | "AUTHOR";
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UserRequest {
    email: string;
    password?: string;
    name: string;
    role: "SUPER_ADMIN" | "EDITOR" | "AUTHOR";
}

export interface PaginatedUsersResponse {
    data: UserItem[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const UsersService = {
    create: async (data: UserRequest): Promise<UserItem> => {
        const res = await fetch(`${API_URL}/api/v1/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Không thể tạo người dùng");
        }
        return res.json();
    },

    getUsers: async (
        page: number = 1,
        limit: number = 10,
        search?: string
    ): Promise<PaginatedUsersResponse> => {
        const url = new URL(`${API_URL}/api/v1/users`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        if (search) url.searchParams.append("search", search);

        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        if (!res.ok) {
            throw new Error("Không thể tải danh sách tài khoản");
        }
        return res.json();
    },

    update: async (id: string, data: Partial<UserRequest>): Promise<UserItem> => {
        const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Không thể cập nhật người dùng");
        }
        return res.json();
    },

    getById: async (id: string): Promise<UserItem> => {
        const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Không thể tải thông tin người dùng");
        }
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Không thể xóa người dùng");
        }
    },
};
