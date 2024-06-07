import { BUTTON_STATE } from "@quiz/constants/answerButtonInfo";

export type ButtonInfo = {
  [key in (typeof BUTTON_STATE)[number]]: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
