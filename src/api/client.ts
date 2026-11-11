import axios from 'axios';
import { mockAdapter } from './mockAdapter';

export const apiClient = axios.create({
  baseURL: 'https://api.fundacion-cauce.test',
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  adapter: mockAdapter,
});

apiClient.interceptors.request.use((config) => {
  config.headers.set('X-Client', 'cauce-mobile');
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<{ message?: string }>(error)) {
      return Promise.reject(new Error(error.response?.data?.message ?? 'No pudimos conectar con el servidor'));
    }
    return Promise.reject(error instanceof Error ? error : new Error('Error desconocido'));
  },
);