import React from "react";

import AnswerContextButton from "@quiz/components/AnswerContextButton";
import TagList from "@quiz/components/TagList";
import { QuizProvider } from "@quiz/context/quizContext";

export default function QuizPage() {
  return (
    <QuizProvider>
      <>
        <div className="flex h-full">
          <TagList />
        </div>
        <AnswerContextButton />
      </>
    </QuizProvider>
  );
}
