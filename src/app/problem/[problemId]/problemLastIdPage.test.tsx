import { useQuery } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

import ProblemLayout from "../layout";
import ProblemPage from "./page";
import { mockProblemModuleStore } from "@common/stores/mockZustandStore";
import ProblemContext, {
  defaultActions,
  defaultStates,
} from "@problem/context/problemContext";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { ProblemContextInfo } from "@problem/types/problemContextInfo";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const isExistNextProblem = vi.fn(() => false);
const clearProblem = vi.fn();

const push = vi.fn();

const renderWithContext = ({
  problemContextValue,
}: {
  problemContextValue: ProblemContextInfo;
}) => {
  return render(
    <QueryClientProviders>
      <ProblemContext.Provider value={problemContextValue}>
        <ProblemLayout>
          <ProblemPage />
        </ProblemLayout>
      </ProblemContext.Provider>
    </QueryClientProviders>,
  );
};

describe("마지막 문제 풀이 페이지 테스트", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push,
        })),
        useParams: vi.fn(() => ({
          problemId: "3",
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
          clearProblem,
          setProblemIds: vi.fn(),
          getCurrentProblemId: vi.fn(),
          getTagCurrentProblemText: vi.fn(() => "3/3"),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
          getArticlePathText: vi.fn(),
        })),
      };
    });
  });

  beforeEach(() => {
    renderWithContext({
      problemContextValue: {
        ...defaultStates,
        ...defaultActions,
      },
    });
    mockProblemModuleStore({
      problemIds: [1, 2, 3],
      currentIdx: 2,
      articleId: "1",
    });
  });

  it("마지막 문제 가져오기 확인", async () => {
    const { result } = renderHook(
      () => useQuery({ ...getProblemQueryOptions({ problemId: "3" }) }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
  it("정답 선택 이후 정답 제출하기 버튼 클릭 시, 해설 컴포넌트 잘 노출되고, 로띠 재생이후 메인으로 넘어가기", async () => {
    vi.useFakeTimers();

    const { result } = renderHook(
      () => useQuery({ ...getProblemQueryOptions({ problemId: "3" }) }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(screen.getByText("3/3")).toBeInTheDocument();
    const choiceAnswerButton = screen.getByRole("button", {
      name: "정리를해서....",
    });
    await userEvent.click(choiceAnswerButton);
    const answerSubmitButton = screen.getByRole("button", {
      name: "정답 제출하기",
    });

    await userEvent.click(answerSubmitButton);

    const problemExplanation = screen.getByRole("article");
    expect(problemExplanation.childElementCount).toBe(2);
    const explanationParagraphy = screen.getByRole("paragraph");

    expect(explanationParagraphy.textContent).toBe(
      "이 유행어는 개발자 PM 영모님께서 종준이에게 주로 사용하는 말입니다. ",
    );

    const problemCompleteDialogCloseButton = screen.getByRole("button", {
      name: "Close",
    });
    await userEvent.click(problemCompleteDialogCloseButton);

    const nextProblemButton = screen.getByRole("button", {
      name: "메인으로 가기",
    });

    await userEvent.click(nextProblemButton);

    expect(isExistNextProblem).toBeCalled();

    expect(clearProblem).toHaveBeenCalledOnce();
    expect(push).toHaveBeenNthCalledWith(1, "/");
  });
});
