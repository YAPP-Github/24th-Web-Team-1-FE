"use client";

import React, { useContext } from "react";

import Tag from "@common/components/Tag";
import useProblemIdsViewModel from "@common/models/useProblemIdsViewModel";

export default function TagList() {
  const { getTagCurrentProblemText } = useProblemIdsViewModel();
  const tagList = [getTagCurrentProblemText()];

  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagList.map((tag) => (
        <Tag key={tag} title={tag} />
      ))}
    </div>
  );
}
