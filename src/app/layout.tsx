import type { Metadata } from "next";
import localFont from "next/font/local";

import { Suspense } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { Toaster } from "@shared/components/ui/toaster";
import { cn } from "@shared/utils/cn";

import "./globals.css";
import MSWProviders from "@mocks/MSWProviders";

export const metadata: Metadata = {
  title: "FEW",
  description: "매일 아침마다 경제 아티클과 문제를 보내드려요!",
  icons: {
    icon: "/fewlogo.svg",
  },
};

// export const runtime = "edge"; // TBD: 개발환경과 분리

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
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </head>
        <body
          className={cn(
            'scrollbar-hide" relative mx-auto flex',
            "min-h-[100dvh] w-full max-w-[480px] overscroll-y-none",
          )}
        >
          <MSWProviders>
            <Suspense>{children}</Suspense>
            <Toaster />
          </MSWProviders>

          <ReactQueryDevtools />
        </body>
      </html>
    </QueryClientProviders>
  );
}
