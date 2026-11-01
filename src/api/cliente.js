const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal
  });

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(`The request failed (${response.status})`, response.status, data);
  }

  if (data && typeof data === 'object' && !Array.isArray(data) && 'message' in data) {
    throw new ApiError('The API answered with an error', response.status, data);
  }

  return data;
}

export const api = {
  list: (resource, signal) => request(`/${resource}`, { signal }),
  get: (resource, id, signal) => request(`/${resource}/${id}`, { signal }),
  create: (resource, body) => request(`/${resource}`, { method: 'POST', body }),
  update: (resource, id, body) => request(`/${resource}/${id}`, { method: 'PUT', body }),
  remove: (resource, id) => request(`/${resource}/${id}`, { method: 'DELETE' })
};

export const errorText = (error) =>
  typeof error?.detail?.message === 'string' ? error.detail.message : 'Check your connection and try again.';
