import React from "react";

import AnswerChoiceList from "@quiz/components/AnswerChoiceList";
import AnswerContextButton from "@quiz/components/AnswerContextButton";
import QuizTitle from "@quiz/components/QuizTitle";
import TagList from "@quiz/components/TagList";
import { QuizProvider } from "@quiz/context/quizContext";

export default function QuizPage() {
  return (
    <QuizProvider>
      <>
        <div className="flex h-full flex-col">
          <TagList />
          <QuizTitle />
          <AnswerChoiceList />
        </div>
        <AnswerContextButton />
      </>
    </QuizProvider>
  );
}
