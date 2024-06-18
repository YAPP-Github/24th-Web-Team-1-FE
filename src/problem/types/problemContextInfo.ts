export type ProblemContextInfo = {
  states: {
    choiceAnswer: string | null;
    answer: string | null;
  };
  actions: {
    updateChoiceAnswer: (choiceAnswer: string) => void;
    updateAnswer: (answer: string) => void;
    initProblemContextInfo: () => void;
  };
};
