import { StoreApi } from "zustand";
import {
  ProblemModuleStore,
  useProblemModuleStore,
} from "./problemModuleStore";

const mockStore = <Hook, State>(hook: StoreApi<Hook>, state: State) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockProblemModuleStore = (state: Partial<ProblemModuleStore>) => {
  mockStore(useProblemModuleStore, state);
};
