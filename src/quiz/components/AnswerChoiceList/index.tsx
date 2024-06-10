"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getQuizInfoQueryOptions } from "@quiz/remotes/getQuizInfoQueryOptions";

import AnswerChoiceButton from "../AnswerChoiceButton";

export default function AnswerChoiceList() {
  const { data: quizInfo } = useQuery({
    ...getQuizInfoQueryOptions(),
  });

  return (
    <section className="mt-[39px] flex flex-col gap-[9px]">
      {quizInfo?.answers.map((answerValue) => (
        <AnswerChoiceButton title={answerValue} key={answerValue} />
      ))}
    </section>
  );
}
