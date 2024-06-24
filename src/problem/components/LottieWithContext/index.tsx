"use client";
import { useParams } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import LottieClient from "@common/components/Lottie";
import { QUERY_KEY } from "@problem/remotes/api";
import lottieJson from "public/assets/Problem_Complete.json";
import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { AnswerCheckInfo } from "@problem/types/problemInfo";

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
