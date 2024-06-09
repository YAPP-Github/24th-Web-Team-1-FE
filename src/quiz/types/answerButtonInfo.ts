import { BUTTON_STATE } from "@quiz/constants/answerButtonInfo";

import { ConstKeyObject } from "@common/types/constKeyObject";

export type ButtonInfo = ConstKeyObject<
  (typeof BUTTON_STATE)[number],
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
