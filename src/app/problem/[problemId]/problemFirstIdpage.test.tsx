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
    vi.mock("@common/models/useProblemIdsViewModel", async () => {
      const actual = await vi.importActual<
        typeof import("@common/models/useProblemIdsViewModel")
      >("@common/models/useProblemIdsViewModel");
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
      name: "높은 운용 비용",
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
      "ETF는 일반적으로 낮은 운용 비용을 특징으로 합니다.이는 ETF가 보통 지수 추종(passive management) 방식으로 운용되기 때문입니다. 지수를 추종하는 전략은 액티브 매니지먼트(active management)에 비해 관리가 덜 복잡하고, 따라서 비용이 낮습니다.",
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
