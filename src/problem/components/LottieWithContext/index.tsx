"use client";
import { useParams } from "next/navigation";

import React, { useContext } from "react";

import { useMutationState } from "@tanstack/react-query";

import LottieClient from "@common/components/Lottie";
import ProblemListContext from "@common/context/problemListContext";
import { QUERY_KEY } from "@problem/remotes/api";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import lottieJson from "public/assets/Problem_Complete.json";

export default function LottieWithContext() {
  const { problemId } = useParams<{ problemId: string }>();
  const {
    states: { currentProblemIdx, totalProblem },
  } = useContext(ProblemListContext);
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  const isVisibleLottie =
    Boolean(problemAnswerInfo[0]) && currentProblemIdx + 1 === totalProblem;

  return isVisibleLottie && <LottieClient animationData={lottieJson} />;
}
