import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import { ProblemAnswerMuationState } from "@problem/types/problemInfo";

interface AnswerChoiceModelProps {
  problemAnswerInfo: ProblemAnswerMuationState | undefined;
  choiceNumber: string | null;
  renderNumber: string;
}

export default function useAnswerChoiceModel({
  problemAnswerInfo,
  choiceNumber,
  renderNumber,
}: AnswerChoiceModelProps) {
  const isSubmitAnswer = Boolean(problemAnswerInfo?.data);
  const answerResultInfo = problemAnswerInfo?.data;
  const postChoiceAnswer = problemAnswerInfo?.variables;

  const INIT_CHOICE_ANSWER = !isSubmitAnswer && choiceNumber !== renderNumber;
  const CURRENT_CHOICE_ANSWER =
    !isSubmitAnswer && choiceNumber === renderNumber;

  const CHOICE_ANSWER_CORRECT =
    isSubmitAnswer && answerResultInfo?.data.answer === renderNumber;
  const CHOICE_ANSWER_FAIL =
    isSubmitAnswer &&
    answerResultInfo?.data.isSolved === false &&
    renderNumber === postChoiceAnswer?.sub;

  const getAnswerChoiceButtonClassName = () => {
    if (INIT_CHOICE_ANSWER)
      return ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER;

    if (CURRENT_CHOICE_ANSWER)
      return ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER;

    if (CHOICE_ANSWER_CORRECT)
      return ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT;

    if (CHOICE_ANSWER_FAIL)
      return ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL;

    return ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER;
  };

  const isChoiceFillCircle = () => {
    if (INIT_CHOICE_ANSWER) return false;
    if (!CURRENT_CHOICE_ANSWER && !CHOICE_ANSWER_CORRECT && !CHOICE_ANSWER_FAIL)
      return false;
    return true;
  };

  const getChoiceFillColor = () => {
    if (INIT_CHOICE_ANSWER) return "#A5A5A5";
    if (CURRENT_CHOICE_ANSWER) return "white";
    if (CHOICE_ANSWER_CORRECT) return "#0166B3";
    if (CHOICE_ANSWER_FAIL) return "#B00020";
    return "#A5A5A5";
  };

  const isProblemAnswerInfo = () => {
    return Boolean(problemAnswerInfo);
  };
  return {
    getAnswerChoiceButtonClassName,
    isChoiceFillCircle,
    isProblemAnswerInfo,
    getChoiceFillColor,
  };
}
