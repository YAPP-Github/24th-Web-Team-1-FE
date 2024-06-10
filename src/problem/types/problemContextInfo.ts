export type ProblemContextInfo = {
  states: {
    answer: string | null;
    isSubmit: boolean;
  };
  actions: {
    updateAnswer: (answer: string) => void;
    updateSubmit: (isSubmit: boolean) => void;
  };
};
