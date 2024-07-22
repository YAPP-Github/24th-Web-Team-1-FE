import { BUTTON_INFO, BUTTON_STATE } from "@problem/constants/answerButtonInfo";

export class AnswerSubmitModel {
  constructor({
    isPostAnswerSuccess,
    isChoiceAnswer,
    isExistNextProblem,
  }: {
    isPostAnswerSuccess: boolean;
    isExistNextProblem: boolean;
    isChoiceAnswer: boolean;
  }) {
    this.isPostAnswerSuccess = isPostAnswerSuccess;
    this.isChoiceAnswer = isChoiceAnswer;
    this.isExistNextProblem = isExistNextProblem;

    this.answerSubmitType();
  }

  private answerSubmitType() {
    this.LAST_PROBLEM_LINK_TO_MAIN =
      this.isPostAnswerSuccess && !this.isExistNextProblem;
    this.POST_ANSWER_SUBMIT =
      this.isPostAnswerSuccess && this.isExistNextProblem;
    this.BEFORE_CHOICHE_ANSWER =
      !this.isChoiceAnswer && !this.isPostAnswerSuccess;
    this.POST_ANSWER_PRE_SUBMIT =
      this.isChoiceAnswer && !this.isPostAnswerSuccess;
  }
  get answerSubmitButtonClassName() {
    if (this.BEFORE_CHOICHE_ANSWER) return BUTTON_INFO.PRE_ANSWER_SELECT;

    if (this.POST_ANSWER_SUBMIT) return BUTTON_INFO.POST_SUBMIT;

    if (this.POST_ANSWER_PRE_SUBMIT) return BUTTON_INFO.POST_ANSWER_PRE_SUBMIT;

    if (this.LAST_PROBLEM_LINK_TO_MAIN) return BUTTON_INFO.LINK_TO_MAIN;
  }

  get answerButtonState() {
    if (this.POST_ANSWER_PRE_SUBMIT) return BUTTON_STATE[0];

    if (this.POST_ANSWER_SUBMIT) return BUTTON_STATE[2];

    if (this.LAST_PROBLEM_LINK_TO_MAIN) return BUTTON_STATE[3];
  }

  private isPostAnswerSuccess: boolean = false;
  private isExistNextProblem: boolean = false;
  private isChoiceAnswer: boolean = false;

  private LAST_PROBLEM_LINK_TO_MAIN: boolean = false;
  private POST_ANSWER_SUBMIT: boolean = false;
  private BEFORE_CHOICHE_ANSWER: boolean = false;
  private POST_ANSWER_PRE_SUBMIT: boolean = false;
}
