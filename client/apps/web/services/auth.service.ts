const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "SUPER_ADMIN" | "EDITOR" | "AUTHOR";
  };
}

export const AuthService = {
  login: async (params: LoginParams): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: params.email.trim().toLowerCase(),
        password: params.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 429 && errorData.retryAfterSeconds) {
        throw new Error(
          `Too many login attempts. Try again in ${errorData.retryAfterSeconds} seconds.`,
        );
      }
      throw new Error(errorData.message || "Login failed");
    }

    const json = await res.json();
    return json.data || json;
  },
};
