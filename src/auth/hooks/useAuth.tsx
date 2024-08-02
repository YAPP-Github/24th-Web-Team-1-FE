import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@api/fewFetch";

import { postTokenQueryOptions } from "@auth/remotes/postTokenQueryOption";
import { tokenResponse } from "@auth/types/auth";

export const useAuth = (auth_token: string) => {
  const { mutate: postToken } = useMutation({
    ...postTokenQueryOptions(
      { auth_token },
      {
        onSuccess: (response: ApiResponse<tokenResponse>) => {
          if (response?.data?.data) {
            const { accessToken, refreshToken } = response.data.data;

            // 쿠키에 토큰 저장
            document.cookie = `accessToken=${accessToken}; path=/`;
            document.cookie = `refreshToken=${refreshToken}; path=/`;
          }
        },
        onError: (error) => {
          // 로그인 실패
          console.error("Authentication failed:", error);
        },
      },
    ),
  });

  useEffect(() => {
    if (auth_token) {
      postToken();
    }
  }, [auth_token, postToken]);
};
