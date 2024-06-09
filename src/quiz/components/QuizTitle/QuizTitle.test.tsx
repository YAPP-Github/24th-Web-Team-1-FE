import { useQuery } from "@tanstack/react-query";

import { describe, expect, it } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import { QUIZ_TITLE_INFO } from "@quiz/constants/quizTitle";
import QuizContext from "@quiz/context/quizContext";
import { getQuizAnswerQueryOptions } from "@quiz/remotes/getQuizAnswerOption";
import { getQuizInfoQueryOptions } from "@quiz/remotes/getQuizInfoQueryOptions";
import { QuizContextInfo } from "@quiz/types/quizContextInfo";

import QuizTitle from ".";
import { testQueryClientWrapper } from "@common/remotes/testQueryClient";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

const defaultState = {
  states: {
    answer: null,
    isSubmit: false,
  },
};
const defaultActions = {
  actions: {
    updateAnswer: () => {},
    updateSubmit: () => {},
  },
};
const renderWithContext = (contextValue: QuizContextInfo) => {
  return render(
    <QueryClientProviders>
      <QuizContext.Provider value={contextValue}>
        <QuizTitle />
      </QuizContext.Provider>
    </QueryClientProviders>,
  );
};

describe("퀴즈 정보 불러오기 테스트", () => {
  it("퀴즈 불러와서 페이지에 보이는지 확인", async () => {
    renderWithContext({
      ...defaultActions,
      states: { ...defaultState.states, isSubmit: false },
    });

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 3 });
      if (QUIZ_TITLE_INFO.NO_ANSWER.title)
        expect(heading).toHaveTextContent(QUIZ_TITLE_INFO.NO_ANSWER.title);
      if (QUIZ_TITLE_INFO.NO_ANSWER.className)
        expect(heading).toHaveClass(QUIZ_TITLE_INFO.NO_ANSWER.className);
    });
  });
});
describe("퀴즈 결과에 따른, 문제 타이틀 변경 테스트", () => {
  it("정답 제출 전 상태", async () => {
    renderWithContext({
      ...defaultActions,
      states: { ...defaultState.states, isSubmit: false },
    });
    const { result } = renderHook(
      () => useQuery({ ...getQuizInfoQueryOptions() }),
      {
        wrapper: testQueryClientWrapper,
      },
    );
    const heading = screen.getByRole("heading", { level: 2 });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    if (result.current.data)
      expect(heading).toHaveTextContent(result.current.data?.question);
  });

  it("정답 제출 후 정답 상태", async () => {
    const contextValue = {
      ...defaultActions,
      states: { answer: "높은 운용 비용", isSubmit: true },
    };
    renderWithContext(contextValue);
    const { result } = renderHook(
      () => useQuery({ ...getQuizAnswerQueryOptions() }),
      {
        wrapper: testQueryClientWrapper,
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    if (result.current.data)
      expect(result.current.data.answer === contextValue.states.answer).toBe(
        true,
      );

    const heading = screen.getByRole("heading", { level: 3 });
    if (QUIZ_TITLE_INFO.ANSWER_CORRECT.title)
      expect(heading).toHaveTextContent(QUIZ_TITLE_INFO.ANSWER_CORRECT.title);

    if (QUIZ_TITLE_INFO.ANSWER_CORRECT.className)
      expect(heading).toHaveClass(QUIZ_TITLE_INFO.ANSWER_CORRECT.className);
  });
  it("정답 제출 후 오답 상태", async () => {
    const contextValue = {
      ...defaultActions,
      states: { answer: "유동성", isSubmit: true },
    };
    renderWithContext(contextValue);

    const { result } = renderHook(
      () => useQuery({ ...getQuizAnswerQueryOptions() }),
      {
        wrapper: testQueryClientWrapper,
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    if (result.current.data)
      expect(result.current.data.answer === contextValue.states.answer).toBe(
        false,
      );

    const heading = screen.getByRole("heading", { level: 3 });
    if (QUIZ_TITLE_INFO.ANSWER_FAIL.title)
      expect(heading).toHaveTextContent(QUIZ_TITLE_INFO.ANSWER_FAIL.title);
    if (QUIZ_TITLE_INFO.ANSWER_FAIL.className)
      expect(heading).toHaveClass(QUIZ_TITLE_INFO.ANSWER_FAIL.className);
  });
});
