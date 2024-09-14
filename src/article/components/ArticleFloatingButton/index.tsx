"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { Button } from "@shared/components/ui/button";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import { cn } from "@shared/utils/cn";

import ProblemIcon from "public/assets/icon/problemIcon.svg";

export default function ArticleFloatingButton() {
  const { articleId } = useParams<{ articleId: string }>();
  const { push } = useRouter();
  const { getCurrentProblemId } = useProblemIdsViewModel();

  const [showButton, setShowButton] = useState(true);

  const onClickGoProblem = () => {
    push(`/problem/${getCurrentProblemId()}`);
    // Mixpanel.track({
    //   name: EVENT_NAME.ARTICLE_PROBLEMBUTTON_TAPPED,
    //   property: { id: articleId },
    // });
  };

  useEffect(() => {
    const handleShowButton = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight >= documentHeight - 1) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className="fixed bottom-[48px] left-[60%] z-10 w-fit">
          <Button
            className={cn(
              "h-[55px] px-5 py-3.5 bg-main rounded-[99px] shadow flex justify-center items-center gap-2"
            )}
            onClick={onClickGoProblem}
          >
            <ProblemIcon />
            <span className="text-base font-bold text-white">퀴즈 풀기</span>
          </Button>
        </div>
      )}
    </>
  );
}
