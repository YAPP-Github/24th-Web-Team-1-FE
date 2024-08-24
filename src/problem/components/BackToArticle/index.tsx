"use client";
import { useParams } from "next/navigation";

import { HTMLAttributes } from "react";

import { useMutationState } from "@tanstack/react-query";

import { ApiResponse } from "@api/fewFetch";

import { cn } from "@shared/utils/cn";

import { BACK_TO_ARTICLE_WORDS } from "@problem/constants/backToArticle";
import { QUERY_KEY } from "@problem/remotes/api";
import {
  AnswerCheckInfo,
  ProblemAnswerBody,
  ProblemAnswerMuationState,
} from "@problem/types/problemInfo";

interface BackToArticleProps extends HTMLAttributes<HTMLDivElement> {}

export default function BackToArticle({ className }: BackToArticleProps) {
  const { problemId } = useParams<{ problemId: string }>();
  const problemAnswersInfo = useMutationState<ProblemAnswerMuationState>({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => {
      return {
        data: mutation.state.data as ApiResponse<AnswerCheckInfo>,
        variables: mutation.state.variables as ProblemAnswerBody,
      };
    },
  });

  const problemAnswerInfo = problemAnswersInfo[0];

  const backToArticleWords = problemAnswerInfo
    ? BACK_TO_ARTICLE_WORDS.AFTER
    : BACK_TO_ARTICLE_WORDS.BEFORE;

  return (
    <div className={cn("flex flex-row space-x-[3px]", className, !problemAnswerInfo && "mt-[91px]" )}>
      <span className="text-sm font-medium text-black">
        {backToArticleWords}
      </span>
      <span className="cursor-pointer text-sm font-bold text-main underline">
        {BACK_TO_ARTICLE_WORDS.ARTICLE}
      </span>
    </div>
  );
}
