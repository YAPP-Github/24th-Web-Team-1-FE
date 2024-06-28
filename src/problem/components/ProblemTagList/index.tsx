"use client";

import React, { useContext } from "react";

import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import TagList from "@common/components/TagList";

export default function ProblemTagList() {
  const { getTagCurrentProblemText, getDayText } = useProblemIdsViewModel();
  const tagTexts = [getTagCurrentProblemText()];
  const dayText = getDayText();

  if (dayText) tagTexts.unshift(dayText);

  return <TagList tagTexts={tagTexts} />;
}
