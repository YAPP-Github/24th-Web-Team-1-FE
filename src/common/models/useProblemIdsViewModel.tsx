import { useProblemModuleStore } from "@common/stores/problemModuleStore";

export const useProblemIdsViewModel = () => {
  const getCurrentProblemId = useProblemModuleStore(
    (state) => state.getCurrentProblemId,
  );
  const setProblemIds = useProblemModuleStore((state) => state.setProblemIds);
  const problemIds = useProblemModuleStore((state) => state.problemIds);
  const articleId = useProblemModuleStore((state) => state.articleId);
  const currentIdx = useProblemModuleStore((state) => state.currentIdx);
  const nextProblemId = useProblemModuleStore((state) => state.nextProblemId);
  const prevSetProblemId = useProblemModuleStore(
    (state) => state.prevProblemId,
  );

  const clearProblem = useProblemModuleStore((state) => state.clearProblem);

  const getTagCurrentProblemText = () => {
    return `${currentIdx + 1}/${problemIds.length}`;
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
    prevSetProblemId,
    getTagCurrentProblemText,
    nextSetProblemId,
    isExistNextProblem,
    getArticlePathText,
  };
};
