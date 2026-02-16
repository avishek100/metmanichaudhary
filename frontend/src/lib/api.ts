export const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  return fetch(url, options);
}

export default apiFetch;
