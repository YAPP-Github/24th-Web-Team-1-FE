import type { Metadata } from "next";
import localFont from "next/font/local";

import { Suspense } from "react";

import "./globals.css";
import QueryClientProviders from "@/components/common/queryClientProvider";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
  title: "FEW",
  description: "매일 아침마다 경제 아티클과 문제를 보내드려요!",
};

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProviders>
      <html lang="en" className={`${pretendard.variable}`}>
        <head></head>
        <body
          className={cn(
            'scrollbar-hide" relative mx-auto flex',
            "min-h-[100dvh] w-full max-w-[375px] overscroll-y-none",
          )}
        >
          <Suspense>{children}</Suspense>
        </body>
      </html>
    </QueryClientProviders>
  );
}
