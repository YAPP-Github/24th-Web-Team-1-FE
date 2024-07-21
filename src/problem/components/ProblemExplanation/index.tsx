"use client";
import { useParams } from "next/navigation";

import { HTMLAttributes } from "react";

import { useMutationState } from "@tanstack/react-query";

import { cn } from "@shared/utils/cn";

import { ApiResponse } from "@api/fewFetch";
import { QUERY_KEY } from "@problem/remotes/api";
import {
  AnswerCheckInfo,
  ProblemAnswerBody,
  ProblemAnswerMuationState,
} from "@problem/types/problemInfo";

interface ProblemExplanationProps extends HTMLAttributes<HTMLDivElement> {}

export default function ProblemExplanation({
  className,
}: ProblemExplanationProps) {
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

  const problemAnswerData = problemAnswerInfo?.data;

  if (!problemAnswerInfo) return null;
  return (
    <article
      className={cn(
        "flex flex-col gap-[8px] rounded bg-background1 p-[20px]",
        className,
      )}
    >
      <header>
        <h3 className="body2-bold px-[5px]">해설</h3>
      </header>
      <p className="body2-regular text-gray4 bg-background1">
        {problemAnswerData &&
          problemAnswerData.data &&
          problemAnswerData.data.data.explanation}
      </p>
    </article>
  );
}
