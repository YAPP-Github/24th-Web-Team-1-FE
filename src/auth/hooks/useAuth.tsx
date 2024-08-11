"use client";
import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { setCookie } from "cookies-next";

import { ApiResponse } from "@api/fewFetch";

import { postTokenQueryOptions } from "@auth/remotes/postTokenQueryOption";
import { tokenResponse } from "@auth/types/auth";
import { COOKIES } from "@shared/constants/token";
import { useRouter } from "next/navigation";
import { SIGNUP_FAILED, SIGNUP_PROGRESS } from "@auth/constants/auth";
import { useToast } from "@shared/components/ui/use-toast";

export const useAuth = (auth_token: string) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: postToken } = useMutation({
    ...postTokenQueryOptions(
      { auth_token },
      {
        onSuccess: (response: ApiResponse<tokenResponse>) => {
          console.log('res   ', response);
          
          if (response?.data?.data) {
            const { accessToken, refreshToken } = response.data.data;

            setCookie(COOKIES.ACCESS_TOKEN, accessToken, {
              maxAge: 24 * 60 * 60, // 30 days
              path: "/",
            });

            setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
              path: "/",
            });
          } else {
            router.push('/auth')
            toast({
              title: SIGNUP_FAILED,
            });
          }
        },
        onError: (error) => {
          // 로그인 실패
          router.push('/auth')
          toast({
            title: SIGNUP_FAILED,
          });
          console.error("Authentication failed:", error);

        },
      },
    ),
  });

  useEffect(() => {
    if (auth_token) {
      const timeoutId = setTimeout(() => {
        postToken();
      }, 100); // 100ms delay

      return () => clearTimeout(timeoutId);
    }
  }, [auth_token, postToken]);
};
