import { ProblemListInfo } from "@problem/types/problemInfo";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface ProblemIdsData {
  problemIds: ProblemListInfo[];
}
interface CurrentProblem {
  currentIdx: number;
}
interface ProblemAction {
  nextProblemId: () => void;
  prevProblemId: () => void;
  getCurrentProblemId: () => number;
  setProblemIds: (problemIds: number[]) => void;
  clearProblem: () => void;
}

type ProblemModuleStore = ProblemIdsData & CurrentProblem & ProblemAction;

export const useProblemModuleStore = create(
  persist<ProblemModuleStore>(
    (set, get) => ({
      problemIds: [],
      currentIdx: 0,
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
      setProblemIds: (problemIds: number[]) =>
        set((state) => ({
          ...state,
          problemIds,
        })),
      clearProblem: () =>
        set(() => ({
          problemIds: [],
          currentIdx: 0,
        })),
    }),
    {
      name: "problem-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
