import { beforeAll, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import AnswerSubmitButton from ".";
import { BUTTON_INFO } from "@problem/constants/answerButtonInfo";
import ProblemContext, {
  defaultActions,
  defaultStates,
} from "@problem/context/problemContext";
import { ProblemContextInfo } from "@problem/types/problemContextInfo";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const isExistNextProblem = vi.fn(() => true);

const renderWithContext = (contextValue: ProblemContextInfo) => {
  return render(
    <QueryClientProviders>
      <ProblemContext.Provider value={contextValue}>
        <AnswerSubmitButton />
      </ProblemContext.Provider>
    </QueryClientProviders>,
  );
};

describe("퀴즈 푸는 하단 버튼, 정답 선택에 따른 테스트", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push: vi.fn(),
        })),
        useParams: vi.fn(() => ({
          problemId: "1",
        })),
      };
    });

    vi.mock("@common/models/useProblemIdsViewModel", async () => {
      const actual = await vi.importActual<
        typeof import("@common/models/useProblemIdsViewModel")
      >("@common/models/useProblemIdsViewModel");
      return {
        ...actual,
        useProblemIdsViewModel: vi.fn(() => ({
          isExistNextProblem,
          nextSetProblemId: vi.fn(),
          clearProblem: vi.fn(),
          setProblemIds: vi.fn(),
          getCurrentProblemId: vi.fn(),
          getTagCurrentProblemText: vi.fn(),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
        })),
      };
    });
  });

  it("정답 선택 전 상태", () => {
    renderWithContext({
      ...defaultStates,
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
  it("정답 선택 후 제출 전 상태", async () => {
    renderWithContext({
      states: {
        ...defaultStates.states,
        choiceAnswer: "높은 운용 비용",
      },
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

  it("정답 선택 후 제출 완료 상태", async () => {
    renderWithContext({
      states: {
        ...defaultStates.states,
        choiceAnswer: "높은 운용 비용",
      },
      ...defaultActions,
    });
    const button = screen.getByRole("button");
    await userEvent.click(button);

    await waitFor(() => {
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
});
