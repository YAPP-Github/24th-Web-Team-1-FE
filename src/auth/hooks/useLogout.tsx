"use client"

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { deleteCookie } from 'cookies-next';

import { ApiResponse } from '@api/fewFetch';

import { logOutOptions } from '@auth/remotes/logoutMembersQueryOption';

export const useLogout = () => {
  const router = useRouter();

  const { mutate: handleLogout } = useMutation({
    ...logOutOptions(),
    onSuccess: (response: ApiResponse<any>) => {
        if (response.data.message === "성공") {
            // 쿠키 삭제 및 로그인 페이지로 이동
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            router.push('/auth');
        }
    },
    onError: (error: any) => {
      console.error('Logout failed:', error);
    },
  });

  return handleLogout;
};
