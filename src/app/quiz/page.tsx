import React from "react";

import AnswerContextButton from "@quiz/components/AnswerContextButton";
import { QuizProvider } from "@quiz/context/quizContext";

export default function QuizPage() {
  return (
    <QuizProvider>
      <>
        <div className="flex h-full">
          <div>컨텐트 내용들</div>
        </div>
        <AnswerContextButton />
      </>
    </QuizProvider>
  );
}
