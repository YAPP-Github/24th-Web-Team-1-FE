"use client";

import { createContext, useState } from "react";

import { ProblemContextInfo } from "@problem/types/problemContextInfo";

const defaultStates = {
  states: {
    choiceAnswer: null,
    answer: null,
  },
};
const defaultActions = {
  actions: {
    updateChoiceAnswer: () => {},
    updateAnswer: () => {},
  },
};
const ProblemContext = createContext<ProblemContextInfo>({
  ...defaultStates,
  ...defaultActions,
});

function ProblemProvider({ children }: { children: React.ReactElement }) {
  const [choiceAnswer, setChoiceAnswer] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const value = {
    states: { choiceAnswer, answer },
    actions: {
      updateChoiceAnswer: (choiceAnswer: string) =>
        setChoiceAnswer(choiceAnswer),
      updateAnswer: (answer: string) => setAnswer(answer),
    },
  };
  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
}

const ProblemConsumer = ProblemContext.Consumer;
export { defaultActions, defaultStates, ProblemConsumer, ProblemProvider };
export default ProblemContext;
