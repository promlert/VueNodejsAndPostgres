// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
}

export const api = {
  async get<T>(url: string, token?: string | null): Promise<T> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    console.log("API GET Request:", `${API_BASE}${url}`, "Token:", token);
    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }
    if (token) {
      headers['x-access-token'] = token;
    }
    const response = await fetch(`${API_BASE}${url}`, {
      method: "GET",
      headers,
    });
    return handleResponse<T>(response);
  },
  async post<T>(url: string, body: any, token?: string | null): Promise<T> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },
  async put<T>(url: string, body: any, token?: string): Promise<T> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async delete<T>(url: string, token?: string): Promise<T> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${url}`, {
      method: "DELETE",
      headers,
    });
    return handleResponse<T>(response);
  },
  // Add put, delete, etc. as needed
};
