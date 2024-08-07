import type { Metadata } from "next";
import localFont from "next/font/local";

import { Suspense } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { cn } from "@shared/utils/cn";

import queryClient from "@api/queryClient";
import MSWProviders from "@mocks/MSWProviders";
import MixpanelProvider from "@shared/components/MixpanelProvider";
import { Toaster } from "@shared/components/ui/toaster";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import "./globals.css";

export const metadata: Metadata = {
  title: "FEW - Just a few minute",
  description: "퀴즈로 뉴스레터 끝까지 읽기",
  openGraph: {
    title: "FEW - Just a few minute",
    description: "퀴즈로 뉴스레터 끝까지 읽기",
    siteName: "FEW",
    locale: "ko_KR",
    type: "website",
    url: "https://www.fewletter.com/",
    images: {
      url: "https://d3ex4vlh373syu.cloudfront.net/images/2024-08-07/ra5vy7rzZghJyvbg.png",
      width: 709,
      height: 469,
    },
  },
  icons: {
    icon: "/fewlogo.svg",
  },
};

export const runtime = "edge"; // TBD: 개발환경과 분리

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
    <MixpanelProvider>
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
              <Suspense>
                <HydrationBoundary state={dehydrate(queryClient)}>
                  {children}
                </HydrationBoundary>
              </Suspense>
              <Toaster />
            </MSWProviders>

            <ReactQueryDevtools />
          </body>
        </html>
      </QueryClientProviders>
    </MixpanelProvider>
  );
}
