"use client";

import { useParams } from "next/navigation";

import React from "react";

import { useMutationState, useQuery } from "@tanstack/react-query";

import { PROBLEM_TITLE_INFO } from "@problem/constants/problemInfo";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { AnswerCheckInfo } from "@problem/types/problemInfo";

export default function ProblemTitle() {
  const { problemId } = useParams<{ problemId: string }>();
  const problemIdNumber = Number(problemId);
  const { data: problemInfo } = useQuery({
    ...getProblemQueryOptions({ problemId: problemIdNumber }),
  });
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: ["get-problem-answer", problemIdNumber],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  if (!problemInfo) return <div>error</div>;

  if (!problemAnswerInfo) return <div>정답제출 실패</div>;

  const problemAnswerData = problemAnswerInfo[0];
  const subTitleInfo =
    (problemAnswerData &&
      (problemAnswerData.isSolved
        ? PROBLEM_TITLE_INFO.ANSWER_CORRECT
        : PROBLEM_TITLE_INFO.ANSWER_FAIL)) ||
    PROBLEM_TITLE_INFO.NO_ANSWER;

  return (
    <header className="mt-[26px] flex flex-col gap-[7px]">
      <h3 className={subTitleInfo.className}>{subTitleInfo.title}</h3>
      <h2 className="h2-bold">{problemInfo.title}</h2>
    </header>
  );
}
