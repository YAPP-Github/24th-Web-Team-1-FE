"use client";
import useProblemIdsViewModel from "@common/models/useProblemIdsViewModel";
import TopBar from "@common/components/TopBar";
import React from "react";

export default function ProblemTopbar() {
  const { prevSetProblemId } = useProblemIdsViewModel();

  return <TopBar onClick={() => prevSetProblemId()} />;
}
