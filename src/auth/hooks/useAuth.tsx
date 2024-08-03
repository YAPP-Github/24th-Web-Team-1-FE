"use client"
import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import { setCookie } from 'cookies-next';

import { ApiResponse } from '@api/fewFetch';

import { postTokenQueryOptions } from '@auth/remotes/postTokenQueryOption';
import { tokenResponse } from '@auth/types/auth';

export const useAuth = (auth_token: string) => {
  const { mutate: postToken } = useMutation({
    ...postTokenQueryOptions(
      { auth_token },
      {
        onSuccess: (response: ApiResponse<tokenResponse>) => {
          if (response?.data?.data) {
            const { accessToken, refreshToken } = response.data.data;

            setCookie('accessToken', accessToken, {
              maxAge: 24 * 60 * 60, // 30 days
              path: '/',
            });

            setCookie('refreshToken', refreshToken, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
              path: '/',
            });
          }
        },
        onError: (error) => {
          // 로그인 실패
          console.error('Authentication failed:', error);
        },
      }
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
