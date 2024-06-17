"use client";

import { createContext, useRef, useState } from "react";

import { ProblemListContextInfo } from "@common/types/problemListContextInfo";

const defaultProblemListStates = {
  states: {
    problemList: [],
    totalProblem: 0,
    currentProblemIdx: 0,
  },
};
const defaultProblemListActions = {
  actions: {
    updateProblemList: () => {},
    nextProblemIdx: () => {},
  },
};
const ProblemListContext = createContext<ProblemListContextInfo>({
  ...defaultProblemListStates,
  ...defaultProblemListActions,
});

function ProblemListProvider({ children }: { children: React.ReactElement }) {
  const [problemList, setProblemList] = useState<number[]>([1]);
  const totalProblem = useRef(problemList.length);
  const [currentProblemIdx, setCurrentProblmeIdx] = useState(0);
  const value = {
    states: {
      problemList,
      totalProblem: totalProblem.current,
      currentProblemIdx,
    },
    actions: {
      updateProblemList: (problemList: number[]) => {
        setProblemList(problemList),
          (totalProblem.current = problemList.length);
      },
      nextProblemIdx: () => {
        setCurrentProblmeIdx(currentProblemIdx + 1);
      },
    },
  };

  return (
    <ProblemListContext.Provider value={value}>
      {children}
    </ProblemListContext.Provider>
  );
}

const ProblemListConsumer = ProblemListContext.Consumer;
export {
  defaultProblemListActions,
  defaultProblemListStates,
  ProblemListConsumer,
  ProblemListProvider,
};
export default ProblemListContext;
