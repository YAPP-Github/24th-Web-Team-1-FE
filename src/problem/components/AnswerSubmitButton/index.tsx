"use client";
import { useParams, useRouter } from "next/navigation";

import { useContext } from "react";

import { useMutation, useMutationState } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";
import { deleteCookie } from "cookies-next";

import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import QuizContext from "@problem/context/problemContext";
import { AnswerSubmitModel } from "@problem/models/AnswerSubmitModel";
import { QUERY_KEY } from "@problem/remotes/api";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import { IS_EXIST_PROBLEMS } from "@shared/constants/middlewareConstant";
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

  const answerSubmitModel = new AnswerSubmitModel({
    isChoiceAnswer: Boolean(choiceAnswer),
    isPostAnswerSuccess: Boolean(problemAnswerInfo[0]),
    isExistNextProblem: isExistNextProblem(),
  });

  const onPostProblemAnswer = () => {
    const answerSubmitModel = new AnswerSubmitModel({
      isChoiceAnswer: Boolean(choiceAnswer),
      isPostAnswerSuccess: Boolean(problemAnswerInfo[0]),
      isExistNextProblem: isExistNextProblem(),
    });
    const BUTTON_STATE = answerSubmitModel.answerButtonState;
    const problemId = nextSetProblemId();

    switch (BUTTON_STATE) {
      case "PRE_ANSWER_SELECT":
        postProblemAnswer({ sub: (choiceAnswer || "").toString() });
        break;

      case "POST_SUBMIT":
        initProblemContextInfo();
        push(`/problem/${problemId}`);
        break;

      case "LINK_TO_MAIN":
        push("/");
        setTimeout(() => {
          clearProblem();
          deleteCookie(IS_EXIST_PROBLEMS);
        }, 2000);
        break;
    }
  };
  const buttonInfo = answerSubmitModel.answerSubmitButtonClassName;

  const result = buttonInfo?.title;
  const style = buttonInfo?.className;

  return (
    <Button
      className={cn(style || "", "h-[56px]")}
      onClick={onPostProblemAnswer}
    >
      {result}
    </Button>
  );
}
