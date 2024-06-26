"use client";

import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { Button } from "@shared/components/ui/button";
import { useRouter } from "next/navigation";
import React, { HTMLAttributes } from "react";

interface ArticleBottomButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export default function ArticleBottomButton({
  title,
}: ArticleBottomButtonProps) {
  const { push } = useRouter();
  const { getCurrentProblemId } = useProblemIdsViewModel();
  const onClickGoProblem = () => {
    push(`/problem/${getCurrentProblemId()}`);
  };
  return (
    <Button
      className="h-[50px] w-full rounded-none bg-main"
      onClick={onClickGoProblem}
    >
      {title}
    </Button>
  );
}
