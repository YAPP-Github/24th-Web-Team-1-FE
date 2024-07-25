import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import { ProblemAnswerMuationState } from "@problem/types/problemInfo";

export class AnswerChoiceModel {
  constructor({
    problemAnswerInfo,
    choiceNumber,
    renderNumber,
  }: {
    problemAnswerInfo: ProblemAnswerMuationState | undefined;
    choiceNumber: string | null;
    renderNumber: string;
  }) {
    this.problemAnswerInfo = problemAnswerInfo;
    this.choiceNumber = choiceNumber;
    this.renderNumber = renderNumber;

    this.answerChoiceButtonType();
  }

  private answerChoiceButtonType() {
    const isSubmitAnswer = Boolean(this.problemAnswerInfo?.data);
    const answerResultInfo = this.problemAnswerInfo?.data;
    const postChoiceAnswer = this.problemAnswerInfo?.variables;

    this.INIT_CHOICE_ANSWER =
      !isSubmitAnswer && this.choiceNumber !== this.renderNumber;
    this.CURRENT_CHOICE_ANSWER =
      !isSubmitAnswer && this.choiceNumber === this.renderNumber;

    this.CHOICE_ANSWER_CORRECT =
      isSubmitAnswer &&
      answerResultInfo?.data.data.answer === this.renderNumber;
    this.CHOICE_ANSWER_FAIL =
      isSubmitAnswer &&
      answerResultInfo?.data.data.isSolved === false &&
      this.renderNumber === postChoiceAnswer?.sub;
  }
  get answerChoiceButtonClassName() {
    if (this.INIT_CHOICE_ANSWER)
      return ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER;

    if (this.CURRENT_CHOICE_ANSWER)
      return ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER;

    if (this.CHOICE_ANSWER_CORRECT)
      return ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT;

    if (this.CHOICE_ANSWER_FAIL)
      return ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL;

    return ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER;
  }

  get isChoiceFillCircle() {
    if (this.INIT_CHOICE_ANSWER) return false;
    if (
      !this.CURRENT_CHOICE_ANSWER &&
      !this.CHOICE_ANSWER_CORRECT &&
      !this.CHOICE_ANSWER_FAIL
    )
      return false;
    return true;
  }

  get getChoiceFillColor() {
    if (this.INIT_CHOICE_ANSWER) return "#A5A5A5";
    if (this.CURRENT_CHOICE_ANSWER) return "white";
    if (this.CHOICE_ANSWER_CORRECT) return "#0166B3";
    if (this.CHOICE_ANSWER_FAIL) return "#B00020";
    return "#A5A5A5";
  }

  get isProblemAnswerInfo() {
    return Boolean(this.problemAnswerInfo);
  }

  private problemAnswerInfo: ProblemAnswerMuationState | undefined;
  private choiceNumber: string | null;
  private renderNumber: string;

  private INIT_CHOICE_ANSWER: boolean = false;
  private CURRENT_CHOICE_ANSWER: boolean = false;
  private CHOICE_ANSWER_CORRECT: boolean = false;
  private CHOICE_ANSWER_FAIL: boolean = false;
}
