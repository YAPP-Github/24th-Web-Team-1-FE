import { useParams } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import { ApiResponse } from "@api/api-config";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import ChoiceFillCircleSvg from "../ChoiceFillCircleSvg";
import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import ProblemContext from "@problem/context/problemContext";
import { QUERY_KEY } from "@problem/remotes/api";
import {
  AnswerCheckInfo,
  AnswerChoiceClientInfo,
  ProblemAnswerBody,
  ProblemAnswerMuationState,
} from "@problem/types/problemInfo";

interface AnswerChoiceButtonProps extends AnswerChoiceClientInfo {}

export default function AnswerChoiceButton({
  content,
  number,
}: AnswerChoiceButtonProps) {
  const { problemId } = useParams<{ problemId: string }>();
  const [className, setClassName] = useState(
    ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className,
  );
  const {
    states: { choiceAnswer },
    actions: { updateChoiceAnswer },
  } = useContext(ProblemContext);

  const problemAnswersInfo = useMutationState<ProblemAnswerMuationState>({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => {
      return {
        data: mutation.state.data as ApiResponse<AnswerCheckInfo>,
        variables: mutation.state.variables as ProblemAnswerBody,
      };
    },
  });
  const problemAnswerInfo = problemAnswersInfo[0];

  const onClickAnswerChoice = () => {
    if (!problemAnswerInfo) updateChoiceAnswer(number);
  };

  const answerResultInfo = problemAnswerInfo?.data;
  const postChoiceAnswer = problemAnswerInfo?.variables;

  useEffect(
    function setButtonClassName() {
      if (!answerResultInfo) {
        if (choiceAnswer === number)
          setClassName(
            ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER.className,
          );

        if (choiceAnswer !== number)
          setClassName(ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className);
      }
      if (answerResultInfo) {
        if (answerResultInfo.data.answer === number)
          setClassName(
            ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT.className,
          );
        if (
          answerResultInfo.data.isSolved === false &&
          number === postChoiceAnswer.sub
        ) {
          setClassName(ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL.className);
        }
      }
    },
    [choiceAnswer, number, problemAnswerInfo],
  );

  return (
    <Button
      className={cn(
        "flex h-[56px] w-full justify-between rounded-s border-[1px] border-text-gray3 px-3",
        className,
      )}
      onClick={onClickAnswerChoice}
    >
      <span className="sub2-bold">{content}</span>

      <ChoiceFillCircleSvg
        isChoice={
          (!answerResultInfo && choiceAnswer === number) ||
          Boolean(answerResultInfo)
        }
        fill={
          (!answerResultInfo && choiceAnswer === number && "white") ||
          (!answerResultInfo && choiceAnswer !== number && "#A5A5A5") ||
          (answerResultInfo &&
            answerResultInfo.data.answer === number &&
            "#0166B3") ||
          (answerResultInfo &&
            answerResultInfo.data.isSolved === false &&
            postChoiceAnswer.sub === number &&
            "#B00020") ||
          ""
        }
      />
    </Button>
  );
}
