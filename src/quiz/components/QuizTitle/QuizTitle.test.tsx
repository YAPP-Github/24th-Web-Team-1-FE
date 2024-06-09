import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { describe, expect, it } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import { QUIZ_TITLE_INFO } from "@quiz/constants/quizTitle";
import QuizContext from "@quiz/context/quizContext";
import { getQuizAnswerQueryOptions } from "@quiz/remotes/getQuizAnswerOption";
import { QuizContextInfo } from "@quiz/types/quizContextInfo";

import QuizTitle from ".";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

const queryClient = new QueryClient();
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

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
describe("퀴즈 결과에 따른, 문제 타이틀 변경 테스트", () => {
  const renderWithContext = (contextValue: QuizContextInfo) => {
    return render(
      <QueryClientProviders>
        <QuizContext.Provider value={contextValue}>
          <QuizTitle />
        </QuizContext.Provider>
      </QueryClientProviders>,
    );
  };
  it("정답 제출 전 상태", async () => {
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

  it("정답 제출 후 정답 상태", async () => {
    const contextValue = {
      ...defaultActions,
      states: { answer: "높은 운용 비용", isSubmit: true },
    };
    renderWithContext(contextValue);
    const { result } = renderHook(
      () => useQuery({ ...getQuizAnswerQueryOptions() }),
      {
        wrapper,
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
        wrapper,
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
