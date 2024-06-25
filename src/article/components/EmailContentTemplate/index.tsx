"use client";

import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import ArticleSkeleton from "../ArticleSkeleton";

export default function EmailContentTemplate() {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getArticleQueryOptions({ articleId }),
    staleTime: 2000,
  });

  if (isLoading || isError)
    return <ArticleSkeleton.EmailContentTemplateSkeleton />;
  if (isError || !articleInfo) return <div>에러</div>;

  const { content } = articleInfo;

  return <article dangerouslySetInnerHTML={{ __html: content }}></article>;
}
