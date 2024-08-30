import { BACK_TO_ARTICLE_WORDS } from "@problem/constants/backToArticle";
import { ProblemAnswerMuationState } from "@problem/types/problemInfo";

export class AnswerStatusModel {
  constructor({
    problemAnswerInfo,
  }: {
    problemAnswerInfo: ProblemAnswerMuationState | undefined;
  }) {
    this.problemAnswerInfo = problemAnswerInfo;
  }

  get problemSolvedStatus() {
    return this.problemAnswerInfo
      ? BACK_TO_ARTICLE_WORDS.AFTER
      : BACK_TO_ARTICLE_WORDS.BEFORE;
  }

  get isProblemAnswerInfo() {
    return Boolean(this.problemAnswerInfo);
  }

  private problemAnswerInfo: ProblemAnswerMuationState | undefined;
}
