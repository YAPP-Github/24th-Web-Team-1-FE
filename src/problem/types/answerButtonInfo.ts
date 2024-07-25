import { BUTTON_STATE } from "@problem/constants/answerButtonInfo";
import { ConstKeyObject } from "@shared/types/constKeyObject";

export type ButtonInfo = ConstKeyObject<
  (typeof BUTTON_STATE)[number],
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
