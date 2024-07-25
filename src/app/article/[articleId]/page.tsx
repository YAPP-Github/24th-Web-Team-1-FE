import { FewResponse } from "@api/fewFetch";
import queryClient from "@api/queryClient";
import ArticleTitle from "@article/components/ArticleTitle";
import EmailContentTemplate from "@article/components/EmailContentTemplate";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import { ArticleDetail } from "@article/types";
import { createMetadata } from "@shared/utils/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { articleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const articleId = params.articleId;
  const workbookId = searchParams?.workbookId;

  let articleInfo = {} as FewResponse<ArticleDetail>;
  if (typeof workbookId === "string") {
    const { data } = await queryClient.fetchQuery({
      ...getArticleWithWorkbookQueryOptions({
        workbookId,
        articleId,
      }),
    });

    articleInfo = data;
  } else {
    const { data } = await queryClient.fetchQuery({
      ...getArticleQueryOptions({ articleId }),
    });
    articleInfo = data;
  }

  const { title, writer } = articleInfo.data;
  return createMetadata({
    title: title,
    description: `${writer.name} 작가의 ${title} 아티클 입니다.`,
  });
}

export default function ArticlePage() {
  return (
    <div className="flex h-full flex-col gap-[46px]">
      <ArticleTitle />
      <EmailContentTemplate />
    </div>
  );
}
