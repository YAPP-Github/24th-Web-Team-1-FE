"use client";
import { useParams } from "next/navigation";

import { HTMLAttributes, useContext, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import { ApiResponse } from "@api/fewFetch";

import { cn } from "@shared/utils/cn";

import { BACK_TO_ARTICLE_WORDS } from "@problem/constants/backToArticle";
import { QUERY_KEY } from "@problem/remotes/api";
import {
  AnswerCheckInfo,
  ProblemAnswerBody,
  ProblemAnswerMuationState,
} from "@problem/types/problemInfo";
import ArticleDropDownWrapper from "../ArticleDropDownWrapper";
import { AnswerStatusModel } from "@problem/models/AnswerStatusModel";
import QuizContext from "@problem/context/problemContext";
import { Mixpanel } from "@shared/utils/mixpanel";
import { EVENT_NAME } from "@shared/constants/mixpanel";

interface BackToArticleProps extends HTMLAttributes<HTMLDivElement> {}

export default function BackToArticle({ className }: BackToArticleProps) {
  const [toggleArticle, setToggleArticle] = useState(false);
  const {
    states: { choiceAnswer },
  } = useContext(QuizContext);

  const { problemId } = useParams<{ problemId: string }>();
  const problemAnswersInfo = useMutationState<ProblemAnswerMuationState>({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, problemId],
    },
    select: (mutation) => {
      return {
        data: mutation.state.data as ApiResponse<AnswerCheckInfo>,
        variables: mutation.state.variables as ProblemAnswerBody,
      };
    },
  });

  const answerStatus = new AnswerStatusModel({
    problemAnswerInfo: problemAnswersInfo[0],
  });

  const backToArticleWords = answerStatus.problemSolvedStatus;

  const handleToggleArticle = () => {
    setToggleArticle((prev) => !prev);
    if (!toggleArticle) {
      const isChoiceAnswer = Boolean(choiceAnswer);
      const type =
        (!answerStatus.isProblemAnswerInfo &&
          !isChoiceAnswer &&
          "notStarted") ||
        (!answerStatus.isProblemAnswerInfo && isChoiceAnswer && "solving") ||
        "solved";
      Mixpanel.track({
        name: EVENT_NAME.PROBLEM_GOARTICLE_TAPPED,
        property: { type },
      });
    }
  };
  console.log(answerStatus.isProblemAnswerInfo, choiceAnswer);
  return (
    <div
      className={cn(
        "relative flex flex-row space-x-[3px]",
        className,
        !answerStatus.isProblemAnswerInfo && "mt-[91px]",
      )}
    >
      <ArticleDropDownWrapper
        toggleArticle={toggleArticle}
        handleToggleArticle={handleToggleArticle}
      />
      <span className="text-sm font-medium text-black">
        {backToArticleWords}
      </span>
      <span
        onClick={handleToggleArticle}
        className="cursor-pointer text-sm font-bold text-main underline"
      >
        {BACK_TO_ARTICLE_WORDS.ARTICLE}
      </span>
    </div>
  );
}
