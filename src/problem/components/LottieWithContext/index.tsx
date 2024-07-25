"use client";
import { useParams } from "next/navigation";

import { useMutationState } from "@tanstack/react-query";

import { QUERY_KEY } from "@problem/remotes/api";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import LottieClient from "@shared/components/Lottie";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import lottieJson from "public/assets/Problem_Complete.json";

export default function LottieWithContext() {
  const { problemId } = useParams<{ problemId: string }>();
  const { isExistNextProblem } = useProblemIdsViewModel();
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  const isVisibleLottie =
    Boolean(problemAnswerInfo[0]) && !isExistNextProblem();

  return isVisibleLottie && <LottieClient animationData={lottieJson} />;
}
