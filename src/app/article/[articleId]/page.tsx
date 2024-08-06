import ArticleTitle from "@article/components/ArticleTitle";
import EmailContentTemplate from "@article/components/EmailContentTemplate";
import { prefetchArticleQuery } from "@article/remotes/prefetchArticleQuery";
import { ArticlePageProps } from "@article/types";
import { createMetadata } from "@shared/utils/metadata";
import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: ArticlePageProps): Promise<Metadata> {
  const { data: articleInfo } = await prefetchArticleQuery({
    params,
    searchParams,
  });

  const { title, writer } = articleInfo;
  return createMetadata({
    title: title,
    description: `${writer.name} 작가의 ${title} 아티클 입니다.`,
  });
}
export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { state } = await prefetchArticleQuery({ params, searchParams });

  return (
    <HydrationBoundary state={state}>
      <div className="flex h-full flex-col gap-[46px]">
        <ArticleTitle />
        <EmailContentTemplate />
      </div>
    </HydrationBoundary>
  );
}
