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
  fields?: CreateFormFieldDto[];
}

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string>;
  status: SubmissionStatus;
  createdAt: string;
}

export interface PublicWish {
  id: string;
  data: Record<string, string>;
  createdAt: string;
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

  getSubmissions: async (formId: string): Promise<FormSubmission[]> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/forms/${formId}/submissions`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể tải danh sách submissions");
    }
    return res.json();
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

  updateSubmissionStatus: async (
    submissionId: string,
    status: SubmissionStatus,
  ): Promise<FormSubmission> => {
    const token = getAuthToken();
    const res = await fetch(
      `${API_URL}/api/forms/submissions/${submissionId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      },
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Không thể cập nhật trạng thái");
    }
    return res.json();
  },

  submitWithMedia: async (
    slug: string,
    data: Record<string, unknown>,
    image: File,
  ): Promise<void> => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('image', image);

    const res = await fetch(`${API_URL}/api/forms/${slug}/submit-with-media`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Gửi form thất bại');
    }
  },

  getPublicSubmissions: async (slug: string): Promise<PublicWish[]> => {
    try {
      const res = await fetch(
        `${API_URL}/api/forms/${slug}/public-submissions`,
        { cache: "no-store" },
      );
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },
};
