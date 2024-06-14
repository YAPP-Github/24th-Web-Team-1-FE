"use client";
import { useParams } from "next/navigation";

import React, { useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";

import { BUTTON_INFO } from "@problem/constants/answerButtonInfo";
import QuizContext from "@problem/context/problemContext";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";

export default function AnswerSubmitButton() {
  const { problemId } = useParams<{ problemId: string }>();
  const problemIdNumber = Number(problemId);
  const {
    states: { choiceAnswer },
  } = useContext(QuizContext);

  const { mutate: postProblemAnswer, isSuccess: isPostAnswerSuccess } =
    useMutation({
      ...postProblemAnswerMutationOptions({ problemId: problemIdNumber }),
    });

  const onPostProblemAnswer = () => {
    if (choiceAnswer) postProblemAnswer({ choiceAns: choiceAnswer });
  };
  const result = isPostAnswerSuccess
    ? BUTTON_INFO.POST_SUBMIT.title
    : BUTTON_INFO.PRE_ANSWER_SELECT.title;

  const style =
    (!choiceAnswer &&
      !isPostAnswerSuccess &&
      BUTTON_INFO.PRE_ANSWER_SELECT.className) ||
    (choiceAnswer &&
      !isPostAnswerSuccess &&
      BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.className) ||
    (choiceAnswer && isPostAnswerSuccess && BUTTON_INFO.POST_SUBMIT.className);

  return (
    <Button className={style || ""} onClick={onPostProblemAnswer}>
      {result}
    </Button>
  );
}
