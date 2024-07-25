"use client";

import { getProblemsQueryOptions } from "@problem/remotes/getProblemsQueryOptions";
import { IS_EXIST_PROBLEMS } from "@shared/constants/middlewareConstant";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import { postLogMutationOptions } from "@shared/remotes/postLogMutationOptions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
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

  const { mutate: postLog } = useMutation({
    ...postLogMutationOptions(),
  });

  useEffect(
    function getProblemIds() {
      if (problemData) {
        setProblemIds({
          problemIds: problemData.problemIds,
          articleId,
        });
        setCookie(IS_EXIST_PROBLEMS, "true");
        postLog({ from: "email", to: "solveProblem" });
        push(`/problem/${problemData.problemIds[currentIdx]}`);
      }
    },
    [problemData],
  );
  return <div></div>;
}
