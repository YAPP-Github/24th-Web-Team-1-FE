'use client';

import { useState } from "react";

import NetworkError from "@shared/components/NetworkError";

interface ErrorProps {
  error: {
    statusCode?: number;
    message?: string;
  };
}

export default function Error({ error }: ErrorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  // 네트워크 오류 상태 코드 확인 (ex: 503, 504 등)
  const isNetworkError = error.statusCode && error?.statusCode >= 500 && error?.statusCode < 600;

  return (
    <div>
      {isNetworkError ? (
        <NetworkError isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        /** TBD: 다른 에러 페이지 커스터마이즈? */
        <div>
          <h1>문제가 발생했습니다</h1>
          <p>{error?.message || '잠시 후 다시 시도해 주세요.'}</p>
        </div>
      )}
    </div>
  );
}
