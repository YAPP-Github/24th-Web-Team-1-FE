import { useQuery } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

import ProblemContext, {
  defaultActions,
  defaultStates,
} from "@problem/context/problemContext";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { ProblemContextInfo } from "@problem/types/problemContextInfo";
import { mockProblemModuleStore } from "@shared/stores/mockZustandStore";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProblemLayout from "./layout";
import ProblemPage from "./page";
import { BACK_TO_ARTICLE_WORDS } from "@problem/constants/backToArticle";

const isExistNextProblem = vi.fn(() => true);
const nextSetProblemId = vi.fn(() => "2");
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

describe("첫 번째 문제풀기 페이지 테스트", () => {
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
          problemId: "1",
        })),
      };
    });
    vi.mock("@shared/models/useProblemIdsViewModel", async () => {
      const actual = await vi.importActual<
        typeof import("@shared/models/useProblemIdsViewModel")
      >("@shared/models/useProblemIdsViewModel");
      return {
        ...actual,
        useProblemIdsViewModel: vi.fn(() => ({
          isExistNextProblem,
          nextSetProblemId,
          clearProblem,
          setProblemIds: vi.fn(),
          getCurrentProblemId: vi.fn(),
          getTagCurrentProblemText: vi.fn(() => "1/3"),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
          getArticlePathText: vi.fn(),
          getDayText: vi.fn(),
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
    mockProblemModuleStore({ problemIds: [1, 2, 3] });
  });
  it("문제데이터 잘 가져오는지 확인", async () => {
    const { result } = renderHook(
      () => useQuery({ ...getProblemQueryOptions({ problemId: "1" }) }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(screen.getByText(BACK_TO_ARTICLE_WORDS.BEFORE)).toBeInTheDocument();
  });

  it("정답 선택 이후 정답 제출하기 버튼 클릭 시, 해설 컴포넌트 잘 노출되고, 다음 문제로 넘어가기 확인", async () => {
    const { result } = renderHook(
      () => useQuery({ ...getProblemQueryOptions({ problemId: "1" }) }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(screen.getByText("1/3")).toBeInTheDocument();
    const choiceAnswerButton = screen.getByRole("button", {
      name: "찬물을 데우는 시간",
    });
    await userEvent.click(choiceAnswerButton);
    const answerSubmitButton = screen.getByRole("button", {
      name: "정답 제출하기",
    });
    await userEvent.click(answerSubmitButton);
    const problemExplanation = screen.getByRole("article");

    expect(problemExplanation.childElementCount).toBe(2);
    const explanationParagraphy = screen.getByRole("paragraph");

    expect(screen.getByText(BACK_TO_ARTICLE_WORDS.AFTER)).toBeInTheDocument();

    expect(explanationParagraphy.textContent).toBe(
      "제임스 와트는 증기를 이용하여 공기를 따뜻하게 만드는 라디에이터를 만들었습니다.",
    );

    const nextProblemButton = screen.getByRole("button", {
      name: "다음 문제 풀기",
    });

    await userEvent.click(nextProblemButton);
    expect(isExistNextProblem).toBeCalled();
    expect(nextSetProblemId).toHaveBeenCalledOnce();

    expect(push).toHaveBeenNthCalledWith(1, "/problem/2");
  });
});
