export type ProblemListContextInfo = {
  states: {
    problemList: number[];
    totalProblem: number;
    currentProblemIdx: number;
  };
  actions: {
    updateProblemList: (problemList: number[]) => void;
    nextProblemIdx: () => void;
  };
};
