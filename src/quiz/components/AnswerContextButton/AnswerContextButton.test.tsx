import { ReactElement } from "react";

import { describe, expect, it, vi } from "vitest";

import { BUTTON_INFO } from "@quiz/constants/answerButtonInfo";
import QuizContext from "@quiz/context/quizContext";
import { QuizContextInfo } from "@quiz/types/quizContextInfo";

import AnswerContextButton from ".";
import { render, screen } from "@testing-library/react";

vi.mock("@shared/components/ui/button", () => ({
  Button: ({
    className,
    children,
  }: {
    className: string;
    children: ReactElement;
  }) => <button className={className}>{children}</button>,
}));
const defaultActions = {
  actions: {
    updateAnswer: () => {},
    updateSubmit: () => {},
  },
};
describe("퀴즈 푸는 하단 버튼, 정답 선택에 따른 테스트", () => {
  const renderWithContext = (contextValue: QuizContextInfo) => {
    return render(
      <QuizContext.Provider value={contextValue}>
        <AnswerContextButton />
      </QuizContext.Provider>,
    );
  };

  it("정답 선택 전 상태", () => {
    renderWithContext({
      states: { answer: null, isSubmit: false },
      ...defaultActions,
    });
    if (BUTTON_INFO.PRE_ANSWER_SELECT.title)
      expect(
        screen.getByText(BUTTON_INFO.PRE_ANSWER_SELECT.title),
      ).toBeInTheDocument();

    if (BUTTON_INFO.PRE_ANSWER_SELECT.className)
      expect(screen.getByRole("button")).toHaveClass(
        BUTTON_INFO.PRE_ANSWER_SELECT.className,
      );
  });
  it("정답 선택 후 상태", () => {
    renderWithContext({
      states: { answer: "정답!!", isSubmit: false },
      ...defaultActions,
    });
    if (BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.title)
      expect(
        screen.getByText(BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.title),
      ).toBeInTheDocument();

    if (BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.className)
      expect(screen.getByRole("button")).toHaveClass(
        BUTTON_INFO.POST_ANSWER_PRE_SUBMIT.className,
      );
  });

  it("정답 선택 후 상태", () => {
    renderWithContext({
      states: { answer: "정답!!", isSubmit: true },
      ...defaultActions,
    });
    if (BUTTON_INFO.POST_SUBMIT.title)
      expect(
        screen.getByText(BUTTON_INFO.POST_SUBMIT.title),
      ).toBeInTheDocument();

    if (BUTTON_INFO.POST_SUBMIT.className)
      expect(screen.getByRole("button")).toHaveClass(
        BUTTON_INFO.POST_SUBMIT.className,
      );
  });
});
