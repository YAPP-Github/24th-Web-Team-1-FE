import { COOKIES } from "@shared/constants/token";
import { getTokenCookie } from "@shared/utils/getTokenCookie";
import { setCookie } from "cookies-next";

export type FewResponse<DataType extends object> = {
  data: DataType;
  message: string;
};
export type FewError = {
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
): Promise<ApiResponse<T>> => {
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

// refreshToken 으로 새로운 accessToken 발급 받기
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIES.REFRESH_TOKEN}=`))
    ?.split("=")[1];

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/memebers/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();

  setCookie(COOKIES.ACCESS_TOKEN, data.accessToken, {
    maxAge: 24 * 60 * 60, // 30 days
    path: "/",
  });

  setCookie(COOKIES.REFRESH_TOKEN, data.refreshToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });

  return data.accessToken;
};

const fetInterceptor: Interceptor = {
  onRequest: (config) => {
    const accessToken = getTokenCookie();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  onResponse: async <T extends object>(response: ApiResponse<T>) => {
    if (!response.ok && response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (typeof document !== "undefined") {
          response.config.headers = {
            ...response.config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
        }
        const retryResponse = await fetch(response.url, response.config);
        return processApiResponse<T>(retryResponse, response.config);
      } catch (error) {
        console.error("Failed to refresh token", error);
        return Promise.reject(error);
      }
    }
    return response;
  },
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
    config: RequestInit = {},
  ): Promise<ApiResponse<T>> => {
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
      const error = reason as FewError;
      return fetInterceptor.onRequestError(error);
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
