"use client";

import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { QUIZ_TITLE_INFO } from "@quiz/constants/quizTitle";
import QuizContext from "@quiz/context/quizContext";
import { getQuizAnswerQueryOptions } from "@quiz/remotes/getQuizAnswerOption";
import { getQuizInfoQueryOptions } from "@quiz/remotes/getQuizInfoQueryOptions";

export default function QuizTitle() {
  const {
    states: { answer, isSubmit },
  } = useContext(QuizContext);

  const { data: quizAnswer, isSuccess } = useQuery({
    ...getQuizAnswerQueryOptions(),
  });
  const { data: quizInfo } = useQuery({
    ...getQuizInfoQueryOptions(),
  });

  if (!isSuccess && !quizAnswer) return <div></div>;

  const subTitleInfo =
    (!isSubmit && QUIZ_TITLE_INFO.NO_ANSWER) ||
    (isSubmit &&
      answer &&
      answer === quizAnswer?.answer &&
      QUIZ_TITLE_INFO.ANSWER_CORRECT) ||
    QUIZ_TITLE_INFO.ANSWER_FAIL;

  return (
    <header className="mt-[26px] flex flex-col gap-[7px]">
      <h3 className={subTitleInfo.className}>{subTitleInfo.title}</h3>
      <h2 className="h2-bold">{quizInfo?.question}</h2>
    </header>
  );
}
