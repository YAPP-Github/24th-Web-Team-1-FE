"use client";

import React, { useContext } from "react";

import { Button } from "@shared/components/ui/button";

import { BUTTON_INFO } from "@problem/constants/answerButtonInfo";
import QuizContext from "@problem/context/problemContext";

export default function AnswerContextButton() {
  const {
    states: { answer, isSubmit },
  } = useContext(QuizContext);

  const result = isSubmit
    ? BUTTON_INFO.POST_SUBMIT.title
    : BUTTON_INFO.PRE_ANSWER_SELECT.title;
  const style =
    (!answer && !isSubmit && BUTTON_INFO.PRE_ANSWER_SELECT.className) ||
    (answer && !isSubmit && BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.className) ||
    BUTTON_INFO.POST_SUBMIT.className;

  return <Button className={style}>{result}</Button>;
}
