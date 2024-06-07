"use client";

import React, { useContext } from "react";

import { Button } from "@shared/components/ui/button";

import QuizContext from "@quiz/context/quizContext";

export default function AnswerContextButton() {
  const {
    states: { answer, isSubmit },
  } = useContext(QuizContext);

  const result = isSubmit ? "다음 문제 풀기" : "정답 제출하기";
  const style =
    (!answer && !isSubmit && "bg-text-gray3 text-text-gray2") ||
    (answer && !isSubmit && "bg-main") ||
    "bg-text-black";

  return <Button className={style}>{result}</Button>;
}
