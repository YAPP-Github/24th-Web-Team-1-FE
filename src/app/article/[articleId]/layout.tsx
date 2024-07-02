import { Metadata } from "next";

import React, { ReactNode } from "react";

import { ApiResponse } from "@api/api-config";

import ArticleBottomButton from "@article/components/ArticleBottomButton/indext";
import { API_ROUTE } from "@article/remotes/api";
import { ArticleDetail } from "@article/types";

import TopBar from "@common/components/TopBar";

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const articleId = params.articleId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTE.ARTICLE(articleId)}`,
  );
  const { data: articleInfo }: ApiResponse<ArticleDetail> = await response.json();

  return {
    title: articleInfo.title,
    description: `${articleInfo.writer.name} 작가의 ${articleInfo.title} 아티클 입니다.`,
    openGraph: {
      title: articleInfo.title,
      description: `${articleInfo.writer.name} 작가의 ${articleInfo.title} 아티클 입니다.`,
    },
    twitter: {
      title: articleInfo.title,
      description: `${articleInfo.writer.name} 작가의 ${articleInfo.title} 아티클 입니다.`,
    },
  };
}

interface ArticlePageLayoutProps {
  children: ReactNode;
}
export default function ArticlePageLayout({
  children,
}: ArticlePageLayoutProps) {
  return (
    <main className="flex h-auto w-full">
      <section className="flex h-auto w-full flex-col justify-between">
        <div className="mx-[20px] mb-[10px] flex flex-col">
          <TopBar />
          {children}
        </div>
        <ArticleBottomButton title={"문제풀기"} />
      </section>
    </main>
  );
}
