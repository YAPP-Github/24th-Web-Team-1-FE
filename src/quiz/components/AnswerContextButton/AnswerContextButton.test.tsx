import { ReactElement } from "react";

import { describe, expect, it, vi } from "vitest";

import QuizContext from "@quiz/context/quizContext";
import { QuizContextInfo } from "@quiz/types";

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
    expect(screen.getByText("정답 제출하기")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass(
      "bg-text-gray3 text-text-gray2",
    );
  });
  it("정답 선택 후 상태", () => {
    renderWithContext({
      states: { answer: "정답!!", isSubmit: false },
      ...defaultActions,
    });
    expect(screen.getByText("정답 제출하기")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-main");
  });

  it("정답 선택 후 상태", () => {
    renderWithContext({
      states: { answer: "정답!!", isSubmit: true },
      ...defaultActions,
    });
    expect(screen.getByText("다음 문제 풀기")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-text-black");
  });
});
