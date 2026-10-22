import { API_URL } from '../config/env';

let token: string | null = null;
export const setAuthToken = (t: string | null) => { token = t; };

interface Options { method?: string; body?: unknown }

/** Goi API backend. Tra ve null khi server tra 204. */
export async function api<T>(path: string, { method = 'GET', body }: Options = {}): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 204) return null;
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error ?? `Lỗi máy chủ (${res.status})`);
    return data as T;
  } catch (e: any) {
    if (e.name === 'AbortError' || e instanceof TypeError) {
      throw new Error(`Không kết nối được máy chủ (${API_URL}). Kiểm tra Wi-Fi và backend.`);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
