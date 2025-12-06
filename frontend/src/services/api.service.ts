import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get<T>(url: string): Promise<T> {
    return this.client
      .get<T>(url)
      .then((response: { data: T }) => response.data);
  }

  post<T>(url: string, data?: unknown): Promise<T> {
    return this.client
      .post<T>(url, data)
      .then((response: { data: T }) => response.data);
  }

  put<T>(url: string, data?: unknown): Promise<T> {
    return this.client
      .put<T>(url, data)
      .then((response: { data: T }) => response.data);
  }

  delete<T>(url: string): Promise<T> {
    return this.client
      .delete<T>(url)
      .then((response: { data: T }) => response.data);
  }
}

export const apiService = new ApiService();
