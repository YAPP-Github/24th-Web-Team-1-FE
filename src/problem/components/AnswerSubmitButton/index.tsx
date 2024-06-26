"use client";
import { useParams, useRouter } from "next/navigation";

import React, { useContext } from "react";

import { useMutation, useMutationState } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";

import { BUTTON_INFO } from "@problem/constants/answerButtonInfo";
import QuizContext from "@problem/context/problemContext";
import { QUERY_KEY } from "@problem/remotes/api";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { cn } from "@shared/utils/cn";

export default function AnswerSubmitButton() {
  const { push } = useRouter();
  const { problemId } = useParams<{ problemId: string }>();
  const {
    states: { choiceAnswer },
    actions: { initProblemContextInfo },
  } = useContext(QuizContext);
  const { isExistNextProblem, nextSetProblemId, clearProblem } =
    useProblemIdsViewModel();

  const { mutate: postProblemAnswer } = useMutation({
    ...postProblemAnswerMutationOptions({ problemId }),
  });
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  const onPostProblemAnswer = () => {
    if (choiceAnswer && !problemAnswerInfo[0])
      postProblemAnswer({ sub: choiceAnswer.toString() });

    if (problemAnswerInfo[0] && isExistNextProblem()) {
      initProblemContextInfo();
      const problemId = nextSetProblemId();
      push(`/problem/${problemId}`);
    }
    if (problemAnswerInfo[0] && !isExistNextProblem()) {
      clearProblem();
      push("/");
    }
  };
  const isPostAnswerSuccess = problemAnswerInfo[0];
  const result =
    (isPostAnswerSuccess &&
      !isExistNextProblem() &&
      BUTTON_INFO.LINK_TO_MAIN.title) ||
    (isPostAnswerSuccess && BUTTON_INFO.POST_SUBMIT.title) ||
    (!isPostAnswerSuccess && BUTTON_INFO.PRE_ANSWER_SELECT.title);

  const style =
    (!choiceAnswer &&
      !isPostAnswerSuccess &&
      BUTTON_INFO.PRE_ANSWER_SELECT.className) ||
    (choiceAnswer &&
      !isPostAnswerSuccess &&
      BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.className) ||
    (isPostAnswerSuccess &&
      !isExistNextProblem() &&
      BUTTON_INFO.LINK_TO_MAIN.className) ||
    (isPostAnswerSuccess && BUTTON_INFO.POST_SUBMIT.className);

  return (
    <Button
      className={cn(style || "", "h-[56px]")}
      onClick={onPostProblemAnswer}
    >
      {result}
    </Button>
  );
}
