"use client";

import TagList from "@shared/components/TagList";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";

export default function ProblemTagList() {
  const { getTagCurrentProblemText, getDayText } = useProblemIdsViewModel();
  const tagTexts = [getTagCurrentProblemText()];
  const dayText = getDayText();

  if (dayText) tagTexts.unshift(dayText);

  return <TagList tagTexts={tagTexts} />;
}
