type FewResponse<DataType extends object> = {
  data: DataType;
  message: string;
};
export type ApiResponse<DataType extends object> = {
  data: FewResponse<DataType>;
  config: RequestInit;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
};

type Interceptor = {
  onRequest: (config: RequestInit) => RequestInit;
  onResponse: <T extends object>(
    response: ApiResponse<T>,
  ) => ApiResponse<T> | PromiseLike<ApiResponse<T>>;
  onRequestError: (reason: unknown) => Promise<never>;
  onResponseError: (reason: unknown) => Promise<never>;
};

const processApiResponse = async <T extends object>(
  response: Response,
  config: RequestInit,
) => {
  const data = (await response.json().catch(() => ({}))) as FewResponse<T>;
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return {
    data,
    config,
    headers,
    ok,
    redirected,
    status,
    statusText: data.message,
    type,
    url,
  };
};

const fetInterceptor: Interceptor = {
  onRequest: (config) => config,
  onResponse: (response) => response,
  onRequestError: (reason) => Promise.reject(reason),
  onResponseError: (reason) => Promise.reject(reason),
};
export const fewFetch = (
  defaultConfig: RequestInit = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
) => {
  const request = async <T extends object = object>(
    url: string,
    config: RequestInit,
  ) => {
    if (!url.startsWith("http")) {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_FEW_WEB}${url}`;
    }

    config = { ...defaultConfig, ...fetInterceptor.onRequest(config) };
    config.headers = { ...defaultConfig.headers, ...config.headers };
    try {
      const response = await fetch(url, config);
      return processApiResponse<T>(response, config)
        .then(fetInterceptor.onResponse)
        .catch(fetInterceptor.onResponseError);
    } catch (reason) {
      return fetInterceptor.onRequestError(reason);
    }
  };
  return {
    request,
    get: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "GET",
      }),
    post: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "POST",
      }),
    patch: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "PATCH",
      }),
    put: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "PUT",
      }),
    delete: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "DELETE",
      }),
  };
};
