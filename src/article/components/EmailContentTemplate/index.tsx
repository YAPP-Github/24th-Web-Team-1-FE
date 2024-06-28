"use client";

import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { useQueries } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import ArticleSkeleton from "../ArticleSkeleton";
import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import { ARTICLE_INFO_TYPE } from "@common/constants/articleCase";

export default function EmailContentTemplate() {
  const { articleId } = useParams<{ articleId: string }>();

  const params = useSearchParams();
  const workbookId = params.get("workbookId");

  const results = useQueries({
    queries: [
      {
        ...getArticleQueryOptions({ articleId }),
        enabled: !workbookId,
      },
      {
        ...getArticleWithWorkbookQueryOptions({
          workbookId,
          articleId,
        }),
        enabled: Boolean(workbookId),
      },
    ],
  });
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = workbookId
    ? results[ARTICLE_INFO_TYPE.ARTICLE_WITH_WORKBOOK]
    : results[ARTICLE_INFO_TYPE.ONLY_ARTICLE];

  if (isLoading || isError)
    return <ArticleSkeleton.EmailContentTemplateSkeleton />;
  if (isError || !articleInfo) return <div>에러</div>;

  const { content } = articleInfo;

  return (
    <article
      className="overflow-hidden"
      dangerouslySetInnerHTML={{ __html: content }}
    ></article>
  );
}
