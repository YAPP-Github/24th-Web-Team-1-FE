import { useParams } from "next/navigation";

import { useContext, useEffect, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import { ApiResponse } from "@api/fewFetch";
import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import ProblemContext from "@problem/context/problemContext";
import { QUERY_KEY } from "@problem/remotes/api";
import {
  AnswerCheckInfo,
  AnswerChoiceClientInfo,
  ProblemAnswerBody,
  ProblemAnswerMuationState,
} from "@problem/types/problemInfo";
import ChoiceFillCircleSvg from "../ChoiceFillCircleSvg";

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

  const answerResultInfo =
    problemAnswerInfo?.data as ApiResponse<AnswerCheckInfo>;
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
        if (answerResultInfo.data.data.answer === number)
          setClassName(
            ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT.className,
          );
        if (
          answerResultInfo.data.data.isSolved === false &&
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
        "flex h-fit min-h-[56px] justify-between rounded-s border-[1px] border-text-gray3 px-3",
        className,
      )}
      onClick={onClickAnswerChoice}
    >
      <span className="sub2-bold max-w-[247px] whitespace-normal text-left">
        {content}
      </span>

      <ChoiceFillCircleSvg
        isChoice={
          (!answerResultInfo && choiceAnswer === number) ||
          (answerResultInfo &&
            (postChoiceAnswer.sub === number ||
              answerResultInfo.data.data.answer === number))
        }
        fill={
          (!answerResultInfo && choiceAnswer === number && "white") ||
          (!answerResultInfo && choiceAnswer !== number && "#A5A5A5") ||
          (answerResultInfo &&
            answerResultInfo.data.data.answer === number &&
            "#0166B3") ||
          (answerResultInfo &&
            answerResultInfo.data.data.isSolved === false &&
            postChoiceAnswer.sub === number &&
            "#B00020") ||
          (answerResultInfo && postChoiceAnswer.sub !== number && "#A5A5A5") ||
          ""
        }
      />
    </Button>
  );
}
