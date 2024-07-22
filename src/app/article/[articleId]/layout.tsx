import { Metadata } from "next";

import { ReactNode } from "react";

import queryClient from "@api/queryClient";

import { createMetadata } from "@shared/utils/metadata";

import ArticleBottomButton from "@article/components/ArticleBottomButton/indext";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";

import TopBar from "@common/components/TopBar";

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const articleId = params.articleId;

  const { data: articleInfo } = await queryClient.fetchQuery({
    ...getArticleQueryOptions({ articleId }),
    staleTime: Infinity,
  });

  const { title, writer } = articleInfo.data;

  return createMetadata({
    title: title,
    description: `${writer.name} 작가의 ${title} 아티클 입니다.`,
  });
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
