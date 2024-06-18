import React from "react";

import { ProblemListProvider } from "@common/context/problemListContext";
import AnswerChoiceList from "@problem/components/AnswerChoiceList";
import AnswerSubmitButton from "@problem/components/AnswerSubmitButton";
import LottieWithContext from "@problem/components/LottieWithContext";
import ProblemExplanation from "@problem/components/ProblemExplanation";
import ProblemTitle from "@problem/components/ProblemTitle";
import TagList from "@problem/components/TagList";
import { ProblemProvider } from "@problem/context/problemContext";
export default function ProblemPage() {
  return (
    <ProblemListProvider>
      <ProblemProvider>
        <>
          <div className="flex h-full flex-col">
            <TagList />
            <ProblemTitle />
            <AnswerChoiceList />
            <ProblemExplanation className="mt-[30px]" />
          </div>
          <AnswerSubmitButton />
          <LottieWithContext />
        </>
      </ProblemProvider>
    </ProblemListProvider>
  );
}
