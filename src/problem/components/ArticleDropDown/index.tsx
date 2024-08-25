"use client";

import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import ProblemArticleTemplate from "../ProblemArticleTemplate";

export function ArticleDropDown() {
  const { getArticleId } = useProblemIdsViewModel();

  console.log(getArticleId());
  
  return (
    <div className="absolute left-0 top-[66px] z-20 h-screen w-full bg-white overflow-y-scroll px-[20px] pb-[100px]">
      <ProblemArticleTemplate articleId={getArticleId()} />
    </div>
  );
}
