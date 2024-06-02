import axios from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface ApiMeta {
  code: number;
  message: string;
}
export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta | null;
  error?: {
    code: number;
    detail: string;
    title: string;
    status: number;
  };
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const axiosRequest = async <T>(
  method: Method,
  url: string,
  data?: FormData | File | Blob | ArrayBuffer | Record<string, unknown>, // FormData 또는 일반 객체를 허용
  headers?: Record<string, string>,
  params?: Record<string, unknown>,
): Promise<T> => {
  const instance = await axiosInstance.request<T>({
    method,
    url,
    data,
    headers,
    params,
  });

  return instance.data;
};
