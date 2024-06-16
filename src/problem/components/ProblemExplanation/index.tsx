"use client";
import React, { HTMLAttributes } from "react";

import { useMutationState } from "@tanstack/react-query";

import { cn } from "@shared/utils/cn";

import { QUERY_KEY } from "@problem/remotes/api";
import { AnswerCheckInfo } from "@problem/types/problemInfo";

interface ProblemExplanationProps extends HTMLAttributes<HTMLDivElement> {}

export default function ProblemExplanation({
  className,
}: ProblemExplanationProps) {
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  if (!problemAnswerInfo.length) return null;
  const problemAnswerData = problemAnswerInfo[0];

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
        {problemAnswerData?.explanation}
      </p>
    </article>
  );
}
