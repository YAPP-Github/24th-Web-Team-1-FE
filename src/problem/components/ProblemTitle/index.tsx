"use client";

import { useParams } from "next/navigation";

import { useMutationState, useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@api/fewFetch";
import { PROBLEM_TITLE_INFO } from "@problem/constants/problemInfo";
import { QUERY_KEY } from "@problem/remotes/api";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import ProblemSkeleton from "../ProblemSkeleton";

export default function ProblemTitle() {
  const { problemId } = useParams<{ problemId: string }>();
  const {
    data: problemInfo,
    isError,
    isLoading,
  } = useQuery({
    ...getProblemQueryOptions({ problemId }),
  });
  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as ApiResponse<AnswerCheckInfo>,
  });

  // useEffect(
  //   function trackMixpanel() {
  //     Mixpanel.track({
  //       name: EVENT_NAME.PROBLEM_APPEAR,
  //       property: { id: problemId },
  //     });
  //   },
  //   [problemId],
  // );
  if (isLoading || isError || !problemInfo)
    return <ProblemSkeleton.TitleSkeleton />;

  if (problemInfo) {
    const problemAnswerData = problemAnswerInfo[0];
    const subTitleInfo =
      (problemAnswerData &&
        (problemAnswerData.data.data.isSolved
          ? PROBLEM_TITLE_INFO.ANSWER_CORRECT
          : PROBLEM_TITLE_INFO.ANSWER_FAIL)) ||
      PROBLEM_TITLE_INFO.NO_ANSWER;

    return (
      <header className="mt-[26px] flex flex-col gap-[7px]">
        <h3 className={subTitleInfo.className}>{subTitleInfo.title}</h3>
        <h2 className="h2-bold">{problemInfo.title}</h2>
      </header>
    );
  }
}
