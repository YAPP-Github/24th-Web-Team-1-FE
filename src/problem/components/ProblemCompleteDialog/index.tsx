"use client";

import { ApiResponse } from "@api/api-config";
import LinkShare from "@common/components/LinkShare";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";
import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { QUERY_KEY } from "@problem/remotes/api";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import ExternalControlOpenDialog from "@shared/components/ExternalControlOpenDialog";
import { useMutationState } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProblemCompleteDialog() {
  const pathname = usePathname();
  const { problemId } = useParams<{ problemId: string }>();
  const { isExistNextProblem } = useProblemIdsViewModel();

  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => mutation.state.data as ApiResponse<AnswerCheckInfo>,
  });

  const isPostAnswerSuccess = problemAnswerInfo[0];
  const [isOpen, setIsOpen] = useState(
    isPostAnswerSuccess && !isExistNextProblem(),
  );

  useEffect(
    function updateOpenDialog() {
      if (isPostAnswerSuccess && !isExistNextProblem()) {
        setTimeout(() => {
          setIsOpen(isPostAnswerSuccess && !isExistNextProblem());
        }, 5000);
      }
    },
    [isPostAnswerSuccess],
  );

  return (
    <ExternalControlOpenDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        <LinkShare.Title title={LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.TITLE} />
      }
      description={
        <LinkShare.Description
          content={LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.DESCRIPTION}
        />
      }
      content={
        <LinkShare.Content
          href={`${process.env.NEXT_PUBLIC_FEW_WEB}${pathname}`}
        />
      }
    />
  );
}
