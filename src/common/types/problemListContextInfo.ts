export type ProblemListInfo = number[];
export type ProblemListContextInfo = {
  states: {
    problemList: ProblemListInfo[];
    totalProblem: number;
    currentProblemIdx: number;
  };
  actions: {
    updateProblemList: (problemList: number[]) => void;
    nextProblemIdx: () => void;
  };
};
