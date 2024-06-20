"use client";

import { useParams } from "next/navigation";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import TitleSection from "@shared/components/TitleSection";

import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";

import WriterInfo from "../WriterInfo";

export default function ArticleTitle() {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getArticleQueryOptions({ articleId }),
    staleTime: 2000,
  });
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
