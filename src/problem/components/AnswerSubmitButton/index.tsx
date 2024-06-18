"use client";
import { useParams, useRouter } from "next/navigation";

import React, { useContext } from "react";

import { useMutation, useMutationState } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";

import ProblemListContext from "@common/context/problemListContext";
import { BUTTON_INFO } from "@problem/constants/answerButtonInfo";
import QuizContext from "@problem/context/problemContext";
import { QUERY_KEY } from "@problem/remotes/api";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";
import { AnswerCheckInfo } from "@problem/types/problemInfo";

export default function AnswerSubmitButton() {
  const { push } = useRouter();
  const { problemId } = useParams<{ problemId: string }>();
  const {
    states: { choiceAnswer },
    actions: { initProblemContextInfo },
  } = useContext(QuizContext);
  const {
    states: { currentProblemIdx, totalProblem, problemList },
    actions: { nextProblemIdx },
  } = useContext(ProblemListContext);

  const { mutate: postProblemAnswer, isSuccess: isPostAnswerSuccess } =
    useMutation({
      ...postProblemAnswerMutationOptions({ problemId }),
      onSuccess: (data) => data.data,
    });

  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  const onPostProblemAnswer = () => {
    if (choiceAnswer && !problemAnswerInfo[0])
      postProblemAnswer({ choiceAns: choiceAnswer });

    if (problemAnswerInfo[0] && currentProblemIdx + 1 < totalProblem) {
      initProblemContextInfo();
      nextProblemIdx();
      push(`/problem/${problemList[currentProblemIdx + 1]}`);
    }
    if (currentProblemIdx === totalProblem) push("/");
  };
  const result =
    (isPostAnswerSuccess &&
      currentProblemIdx + 1 === totalProblem &&
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
    (choiceAnswer &&
      isPostAnswerSuccess &&
      currentProblemIdx + 1 === totalProblem &&
      BUTTON_INFO.LINK_TO_MAIN.className) ||
    (choiceAnswer && isPostAnswerSuccess && BUTTON_INFO.POST_SUBMIT.className);

  return (
    <Button className={style || ""} onClick={onPostProblemAnswer}>
      {result}
    </Button>
  );
}
