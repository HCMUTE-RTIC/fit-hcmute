import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export type FieldType =
  | "TEXT"
  | "TEXTAREA"
  | "EMAIL"
  | "PHONE"
  | "SELECT"
  | "RADIO"
  | "CHECKBOX"
  | "FILE";

export interface FormField {
  id: string;
  formId: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface FormDefinition {
  id: string;
  title: string;
  slug: string;
  description?: string;
  active: boolean;
  eventId?: string | null;
  createdAt: string;
  updatedAt: string;
  fields: FormField[];
  event?: { title: string; slug: string };
  _count?: { submissions: number };
}

export interface CreateFormFieldDto {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  order?: number;
}

export interface CreateFormDefinitionDto {
  title: string;
  description?: string;
  eventId?: string;
  fields: CreateFormFieldDto[];
}

export interface UpdateFormDefinitionDto {
  title?: string;
  description?: string;
  active?: boolean;
}

export const FormsService = {
  findAll: async (): Promise<FormDefinition[]> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/forms`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tải danh sách forms");
    }
    return res.json();
  },

  findOne: async (slug: string): Promise<FormDefinition> => {
    const res = await fetch(`${API_URL}/api/forms/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không tìm thấy form");
    }
    return res.json();
  },

  create: async (data: CreateFormDefinitionDto): Promise<FormDefinition> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tạo form");
    }
    return res.json();
  },

  update: async (
    id: string,
    data: UpdateFormDefinitionDto,
  ): Promise<FormDefinition> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/forms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể cập nhật form");
    }
    return res.json();
  },

  remove: async (id: string): Promise<void> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/forms/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể xóa form");
    }
  },

  submit: async (
    slug: string,
    data: Record<string, unknown>,
  ): Promise<void> => {
    const res = await fetch(`${API_URL}/api/forms/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Gửi form thất bại");
    }
  },
};
