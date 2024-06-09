"use client";

import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { QUIZ_TITLE_INFO } from "@quiz/constants/quizTitle";
import QuizContext from "@quiz/context/quizContext";
import { getQuizAnswerQueryOptions } from "@quiz/remotes/getQuizAnswerOption";

export default function QuizTitle() {
  const {
    states: { answer, isSubmit },
  } = useContext(QuizContext);

  const { data: quizAnswer, isSuccess } = useQuery({
    ...getQuizAnswerQueryOptions(),
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
    </header>
  );
}
