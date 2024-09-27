"use client";

import { useParams, useRouter } from "next/navigation";

import { HTMLAttributes } from "react";

import { Button } from "@shared/components/ui/button";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import { EVENT_NAME } from "@shared/constants/mixpanel";
import { Mixpanel } from "@shared/utils/mixpanel";

interface ArticleBottomButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export default function ArticleBottomButton({
  title,
}: ArticleBottomButtonProps) {
  const { articleId } = useParams<{ articleId: string }>();
  const { push } = useRouter();
  const { getCurrentProblemId } = useProblemIdsViewModel();
  const onClickGoProblem = () => {
    push(`/problem/${getCurrentProblemId()}`);
    Mixpanel.track({
      name: EVENT_NAME.ARTICLE_PROBLEMBUTTON_TAPPED,
      property: { id: articleId },
    });
  };
  return (
    <Button
      className="sub2-bold h-[88px] w-full rounded-none bg-main"
      onClick={onClickGoProblem}
    >
      {title}
    </Button>
  );
}
