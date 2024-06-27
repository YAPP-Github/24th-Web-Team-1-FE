import React from "react";

import AnswerChoiceList from "@problem/components/AnswerChoiceList";
import LottieWithContext from "@problem/components/LottieWithContext";
import ProblemExplanation from "@problem/components/ProblemExplanation";
import ProblemTitle from "@problem/components/ProblemTitle";

import TagList from "@problem/components/TagList";

export default function ProblemPage() {
  return (
    <div className="relative flex h-fit flex-col">
      <LottieWithContext />
      <TagList />
      <ProblemTitle />
      <AnswerChoiceList />
      <ProblemExplanation className="my-[30px]" />
    </div>
  );
}
