import { FewResponse } from "@api/fewFetch";
import queryClient from "@api/queryClient";
import { ArticleDetail, ArticlePageProps } from "@article/types";
import { PrefetchQuery } from "@common/types/prefetchQuery";
import { dehydrate } from "@tanstack/react-query";
import { getArticleQueryOptions } from "./getArticleQueryOptions";
import { getArticleWithWorkbookQueryOptions } from "./getArticleWithWorkbookQueryOptions";

export const prefetchArticleQuery = async ({
  params,
  searchParams,
}: ArticlePageProps): Promise<PrefetchQuery<ArticleDetail>> => {
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

  return { data: articleInfo.data, state: dehydrate(queryClient) };
};
