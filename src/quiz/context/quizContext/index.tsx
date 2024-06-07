"use client";

import { createContext, useState } from "react";

import { QuizContextInfo } from "@quiz/types/quizContextInfo";

const QuizContext = createContext<QuizContextInfo>({
  states: { answer: "", isSubmit: false },
  actions: {
    updateAnswer: () => {},
    updateSubmit: () => {},
  },
});

function QuizProvider({ children }: { children: React.ReactElement }) {
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const value = {
    states: { answer, isSubmit },
    actions: {
      updateAnswer: (answer: string) => setAnswer(answer),
      updateSubmit: (isSubmit: boolean) => setIsSubmit(isSubmit),
    },
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

const QuizConsumer = QuizContext.Consumer;
export { QuizConsumer, QuizProvider };
export default QuizContext;
