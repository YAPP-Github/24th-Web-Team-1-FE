"use client";

import { useParams } from "next/navigation";

import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import TitleSection from "@shared/components/TitleSection";

import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";

import WriterInfo from "../WriterInfo";
import useProblemIdsViewModel from "@common/models/useProblemIdsViewModel";

export default function ArticleTitle() {
  const { articleId } = useParams<{ articleId: string }>();
  const { setProblemIds } = useProblemIdsViewModel();
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getArticleQueryOptions({ articleId }),
    staleTime: 2000,
  });
  useEffect(
    function setProblemIdsData() {
      if (articleInfo) setProblemIds(articleInfo.problemIds);
    },
    [articleInfo],
  );

  // TODO : Loading 컴포넌트 제작 필요
  if (isLoading) return <div>로딩중</div>;
  if (isError || !articleInfo) return <div>에러</div>;

  const { category, title, writer } = articleInfo;

  const titleSectionData = {
    category,
    title,
    editorComponent: <WriterInfo {...writer} />,
  };

  return <TitleSection {...titleSectionData} />;
}
