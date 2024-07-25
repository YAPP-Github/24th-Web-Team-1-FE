import { useProblemModuleStore } from "@shared/stores/problemModuleStore";

export const useProblemIdsViewModel = () => {
  const getCurrentProblemId = useProblemModuleStore(
    (state) => state.getCurrentProblemId,
  );
  const setProblemIds = useProblemModuleStore((state) => state.setProblemIds);
  const problemIds = useProblemModuleStore((state) => state.problemIds);
  const articleId = useProblemModuleStore((state) => state.articleId);
  const day = useProblemModuleStore((state) => state.day);
  const currentIdx = useProblemModuleStore((state) => state.currentIdx);
  const nextProblemId = useProblemModuleStore((state) => state.nextProblemId);
  const prevSetProblemId = useProblemModuleStore(
    (state) => state.prevProblemId,
  );

  const clearProblem = useProblemModuleStore((state) => state.clearProblem);

  const getTagCurrentProblemText = () => {
    return `${currentIdx + 1}/${problemIds.length}`;
  };

  const getDayText = () => {
    return day ? `Day ${day}` : undefined;
  };

  const isExistNextProblem = () => {
    return currentIdx + 1 < problemIds.length;
  };

  const nextSetProblemId = () => {
    nextProblemId();
    return problemIds[currentIdx + 1];
  };

  const getArticlePathText = () => {
    return `${process.env.NEXT_PUBLIC_FEW_WEB}/article/${articleId}`;
  };

  return {
    setProblemIds,
    clearProblem,
    getCurrentProblemId,
    currentIdx,
    getDayText,
    prevSetProblemId,
    getTagCurrentProblemText,
    nextSetProblemId,
    isExistNextProblem,
    getArticlePathText,
  };
};
