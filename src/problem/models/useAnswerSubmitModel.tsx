import { BUTTON_INFO, BUTTON_STATE } from "@problem/constants/answerButtonInfo";

interface AnswerSubmitModelProps {
  isPostAnswerSuccess: boolean;
  isExistNextProblem: boolean;
  isChoiceAnswer: boolean;
}
export default function useAnswerSubmitModel({
  isPostAnswerSuccess,
  isChoiceAnswer,
  isExistNextProblem,
}: AnswerSubmitModelProps) {
  const LAST_PROBLEM_LINK_TO_MAIN = isPostAnswerSuccess && !isExistNextProblem;
  const POST_ANSWER_SUBMIT = isPostAnswerSuccess && isExistNextProblem;
  const BEFORE_CHOICHE_ANSWER = !isChoiceAnswer && !isPostAnswerSuccess;
  const POST_ANSWER_PRE_SUBMIT = isChoiceAnswer && !isPostAnswerSuccess;

  const getAnswerSubmitButtonInfo = () => {
    if (BEFORE_CHOICHE_ANSWER) return BUTTON_INFO.PRE_ANSWER_SELECT;

    if (POST_ANSWER_SUBMIT) return BUTTON_INFO.POST_SUBMIT;

    if (POST_ANSWER_PRE_SUBMIT) return BUTTON_INFO.POST_ANSWER_PRE_SUBMIT;

    if (LAST_PROBLEM_LINK_TO_MAIN) return BUTTON_INFO.LINK_TO_MAIN;
  };

  const getAnswerButtonState = () => {
    if (POST_ANSWER_PRE_SUBMIT) return BUTTON_STATE[0];

    if (POST_ANSWER_SUBMIT) return BUTTON_STATE[2];

    if (LAST_PROBLEM_LINK_TO_MAIN) return BUTTON_STATE[3];
  };

  return {
    getAnswerSubmitButtonInfo,
    getAnswerButtonState,
  };
}
