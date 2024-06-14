import { ConstKeyObject } from "@common/types/constKeyObject";
import { BUTTON_STATE } from "@problem/constants/answerButtonInfo";

export type ButtonInfo = ConstKeyObject<
  (typeof BUTTON_STATE)[number],
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
