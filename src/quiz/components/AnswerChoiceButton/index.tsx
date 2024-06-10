import React, { HTMLAttributes, useContext, useEffect, useState } from "react";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import { ANSWER_CHOICHE_BUTTON_INFO } from "@quiz/constants/quizInfo";
import QuizContext from "@quiz/context/quizContext";

import IconAnswerChoice from "public/assets/icon16/answer_choice_16.svg";

interface AnswerChoiceButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function AnswerChoiceButton({ title }: AnswerChoiceButtonProps) {
  const [className, setClassName] = useState(
    ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className,
  );
  const {
    states: { answer },
    actions: { updateAnswer },
  } = useContext(QuizContext);

  const onClickAnswerChoice = () => {
    updateAnswer(title);
  };

  useEffect(
    function setButtonClassName() {
      if (answer === title)
        setClassName(
          ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER.className,
        );

      if (answer !== title)
        setClassName(ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className);
    },
    [answer, title],
  );

  return (
    <Button
      className={cn(
        "flex w-full justify-between rounded-s border-[1px] border-text-gray3 px-3",
        className,
      )}
      onClick={onClickAnswerChoice}
    >
      <span className="sub2-bold">{title}</span>
      <IconAnswerChoice />
    </Button>
  );
}
