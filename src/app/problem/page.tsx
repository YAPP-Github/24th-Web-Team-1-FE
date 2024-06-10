import React from "react";

import AnswerChoiceList from "@problem/components/AnswerChoiceList";
import AnswerContextButton from "@problem/components/AnswerContextButton";
import ProblemTitle from "@problem/components/ProblemTitle";
import TagList from "@problem/components/TagList";
import { ProblemProvider } from "@problem/context/problemContext";

export default function QuizPage() {
  return (
    <ProblemProvider>
      <>
        <div className="flex h-full flex-col">
          <TagList />
          <ProblemTitle />
          <AnswerChoiceList />
        </div>
        <AnswerContextButton />
      </>
    </ProblemProvider>
  );
}
