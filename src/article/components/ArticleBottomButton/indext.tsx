"use client";

import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { Button } from "@shared/components/ui/button";
import { EVENT_NAME } from "@shared/constants/mixpanel";
import { Mixpanel } from "@shared/utils/mixpanel";
import { useParams, useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

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
