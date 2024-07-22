import { Metadata } from "next";

import { ReactNode } from "react";

import { createMetadata } from "@shared/utils/metadata";

import ArticleBottomButton from "@article/components/ArticleBottomButton/indext";
import { API_ROUTE } from "@article/remotes/api";
import { ArticleDetail } from "@article/types";

import { fewFetch } from "@api/fewFetch";
import TopBar from "@common/components/TopBar";

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const articleId = params.articleId;

  const { data: articleInfo } = await fewFetch().get<ArticleDetail>(
    `${API_ROUTE.ARTICLE(articleId)}`,
  );
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
