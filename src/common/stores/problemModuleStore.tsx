import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ProblemListInfo } from "@problem/types/problemInfo";
interface ProblemIdsData {
  problemIds: ProblemListInfo[];
  articleId: string;
}
interface CurrentProblem {
  currentIdx: number;
}
interface ProblemAction {
  nextProblemId: () => void;
  prevProblemId: () => void;
  getCurrentProblemId: () => number;
  setProblemIds: ({
    problemIds,
    articleId,
  }: {
    problemIds: number[];
    articleId: string;
  }) => void;
  clearProblem: () => void;
}

export type ProblemModuleStore = ProblemIdsData &
  CurrentProblem &
  ProblemAction;

export const useProblemModuleStore = create(
  persist<ProblemModuleStore>(
    (set, get) => ({
      problemIds: [],
      currentIdx: 0,
      articleId: "",
      nextProblemId: () =>
        set((state) => ({
          ...state,
          currentIdx:
            state.currentIdx < state.problemIds.length
              ? state.currentIdx + 1
              : state.currentIdx,
        })),
      prevProblemId: () =>
        set((state) => ({
          ...state,
          currentIdx: state.currentIdx > 1 ? state.currentIdx - 1 : 0,
        })),
      getCurrentProblemId: () => {
        const currentIdx = get().currentIdx;
        const problemIds = get().problemIds;

        return problemIds[currentIdx];
      },
      setProblemIds: ({ problemIds, articleId }) =>
        set((state) => ({
          ...state,
          articleId,
          problemIds,
        })),
      clearProblem: () =>
        set(() => ({
          problemIds: [],
          currentIdx: 0,
          articleId: "",
        })),
    }),
    {
      name: "problem-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
