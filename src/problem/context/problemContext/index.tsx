"use client";

import { createContext, useState } from "react";

import { ProblemContextInfo } from "@problem/types/problemContextInfo";

const ProblemContext = createContext<ProblemContextInfo>({
  states: { answer: "", isSubmit: false },
  actions: {
    updateAnswer: () => {},
    updateSubmit: () => {},
  },
});

function ProblemProvider({ children }: { children: React.ReactElement }) {
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const value = {
    states: { answer, isSubmit },
    actions: {
      updateAnswer: (answer: string) => setAnswer(answer),
      updateSubmit: (isSubmit: boolean) => setIsSubmit(isSubmit),
    },
  };
  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
}

const ProblemConsumer = ProblemContext.Consumer;
export { ProblemConsumer, ProblemProvider };
export default ProblemContext;
