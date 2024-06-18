"use client";

import React, { useContext } from "react";

import Tag from "@common/components/Tag";
import ProblemListContext from "@common/context/problemListContext";

export default function TagList() {
  const {
    states: { totalProblem, currentProblemIdx },
  } = useContext(ProblemListContext);

  const tagList = [`${currentProblemIdx + 1}/${totalProblem}`];
  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagList.map((tag) => (
        <Tag key={tag} title={tag} />
      ))}
    </div>
  );
}
