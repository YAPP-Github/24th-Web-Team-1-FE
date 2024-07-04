"use client";

import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { getProblemsQueryOptions } from "@problem/remotes/getProblemsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProblemPage() {
  const { setProblemIds, currentIdx } = useProblemIdsViewModel();
  const { push } = useRouter();
  const parms = useSearchParams();
  const articleId = parms.get("articleId") as string;

  const { data: problemData } = useQuery({
    ...getProblemsQueryOptions({ articleId }),
  });

  useEffect(
    function getProblemIds() {
      if (problemData) {
        setProblemIds({
          problemIds: problemData.problemIds,
          articleId,
        });
        push(`/problem/${problemData.problemIds[currentIdx]}`);
      }
    },
    [problemData],
  );
  return <div></div>;
}
