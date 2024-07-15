import { useParams } from "next/navigation";

import { useContext, useEffect, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import { ApiResponse } from "@api/api-config";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import ProblemContext from "@problem/context/problemContext";
import useAnswerChoiceModel from "@problem/models/useAnswerChoiceModel";
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
  const {
    getAnswerChoiceButtonClassName,
    isChoiceFillCircle,
    isProblemAnswerInfo,
    getChoiceFillColor,
  } = useAnswerChoiceModel({
    problemAnswerInfo: problemAnswersInfo[0],
    choiceNumber: choiceAnswer,
    renderNumber: number,
  });

  const onClickAnswerChoice = () => {
    if (!isProblemAnswerInfo()) updateChoiceAnswer(number);
  };

  useEffect(
    function setButtonClassName() {
      const buttonInfo = getAnswerChoiceButtonClassName();
      setClassName(buttonInfo?.className);
    },
    [choiceAnswer, number, problemAnswersInfo],
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
        isChoice={isChoiceFillCircle()}
        fill={getChoiceFillColor()}
      />
    </Button>
  );
}
