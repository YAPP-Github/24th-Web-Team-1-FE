import React from "react";

import { QuizProvider } from "@quiz/context/quizContext";

import AnswerContextButton from "@quiz/components/AnswerContextButton";

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
