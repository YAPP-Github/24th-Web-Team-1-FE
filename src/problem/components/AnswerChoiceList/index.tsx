"use client";

import { useParams } from "next/navigation";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import AnswerChoiceButton from "../AnswerChoiceButton";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";

export default function AnswerChoiceList() {
  const { problemId } = useParams<{ problemId: string }>();
  const { data: problemInfo } = useQuery({
    ...getProblemQueryOptions({ problemId }),
  });

  if (!problemInfo) return <div>error</div>;

  return (
    <section className="mt-[39px] flex flex-col gap-[9px]">
      {problemInfo.contents.map((answerValue) => (
        <AnswerChoiceButton {...answerValue} key={answerValue.content} />
      ))}
    </section>
  );
}
