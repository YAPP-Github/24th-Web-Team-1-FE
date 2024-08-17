"use client";
import { useParams, useSearchParams } from "next/navigation";

import { useEffect, useRef } from "react";

import { useQueries } from "@tanstack/react-query";

import { setCookie } from "cookies-next";

import TitleSection from "@shared/components/TitleSection";
import { IS_EXIST_PROBLEMS } from "@shared/constants/middlewareConstant";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";

import { ARTICLE_INFO_TYPE } from "@article/constants/articleCase";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import { ArticleDetail, ArticleWithWorkbookDetail } from "@article/types";

import ArticleSkeleton from "../ArticleSkeleton";
import WriterInfo from "../WriterInfo";

export default function ArticleTitle() {
  const isFirstRender = useRef(false);
  const { articleId } = useParams<{ articleId: string }>();
  const { setProblemIds, getDayText } = useProblemIdsViewModel();

  const params = useSearchParams();
  const workbookId = params.get("workbookId");

  const results = useQueries({
    queries: [
      {
        ...getArticleQueryOptions({ articleId }),
        enabled: !workbookId,
        staleTime: Infinity,
      },
      {
        ...getArticleWithWorkbookQueryOptions({
          workbookId,
          articleId,
        }),
        enabled: Boolean(workbookId),
        staleTime: Infinity,
      },
    ],
  });

  const { data, isLoading, isError } = workbookId
    ? results[ARTICLE_INFO_TYPE.ARTICLE_WITH_WORKBOOK]
    : results[ARTICLE_INFO_TYPE.ONLY_ARTICLE];

  const articleInfo = data as ArticleDetail | ArticleWithWorkbookDetail;

  useEffect(
    function setProblemIdsData() {
      if (articleInfo)
        setProblemIds({
          problemIds: articleInfo.problemIds,
          articleId,
          day: "day" in articleInfo ? articleInfo.day : undefined,
        });
      setCookie(IS_EXIST_PROBLEMS, "true");
    },
    [articleInfo],
  );

  // useEffect(
  //   function trackMixpanel() {
  //     if (!isFirstRender.current) {
  //       isFirstRender.current = true;
  //       Mixpanel.track({
  //         name: EVENT_NAME.ARTICLE_APPREAR,
  //         property: { id: articleId },
  //       });
  //     }
  //   },
  //   [articleInfo],
  // );

  if (isLoading || isError || !articleInfo)
    return <ArticleSkeleton.TitleSkeleton />;

  const { category, title, writer } = articleInfo;
  const dayText = getDayText();

  const titleSectionData = {
    tagTexts: dayText ? [category, dayText] : [category],
    title,
    editorComponent: <WriterInfo {...writer} />,
  };

  return <TitleSection {...titleSectionData} />;
}
