"use client";

import { useParams } from "next/navigation";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import AnswerChoiceButton from "../AnswerChoiceButton";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import ProblemSkeleton from "../ProblemSkeleton";

export default function AnswerChoiceList() {
  const { problemId } = useParams<{ problemId: string }>();
  const {
    data: problemInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getProblemQueryOptions({ problemId }),
  });
  if (isLoading || isError) return <ProblemSkeleton.AnswerChoiceListSkeleton />;

  return (
    <section className="mt-[39px] flex flex-col gap-[9px]">
      {problemInfo?.contents?.map((answerValue) => (
        <AnswerChoiceButton {...answerValue} key={answerValue.content} />
      ))}
    </section>
  );
}
