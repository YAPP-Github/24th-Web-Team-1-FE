import { useMutation } from "@tanstack/react-query";

import { beforeAll, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

import ProblemCompleteDialog from ".";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";
import { mockProblemModuleStore } from "@common/stores/mockZustandStore";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";

const isExistNextProblem = vi.fn(() => false);
const renderWithQueryClient = () => {
  return render(
    <QueryClientProviders>
      <ProblemCompleteDialog />
    </QueryClientProviders>,
  );
};

const getArticlePathText = vi.fn(
  () => `${process.env.NEXT_PUBLIC_FEW_WEB}/article/1`,
);

describe("마지막 선택지 제출완료시 팝업 노출 테스트", () => {
  beforeAll(() => {
    mockProblemModuleStore({ problemIds: [1, 2, 3], articleId: "1" });
    vi.mock("next/navigation", () => {
      return {
        __esModule: true,
        usePathname: () => "/problem/1",
        useRouter: () => ({
          push: vi.fn(),
          replace: vi.fn(),
          prefetch: vi.fn(),
        }),
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
          clearProblem: vi.fn(),
          setProblemIds: vi.fn(),
          getCurrentProblemId: vi.fn(),
          getTagCurrentProblemText: vi.fn(() => "3/3"),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
          getArticlePathText,
        })),
      };
    });
  });
  it("정답 mutation 호출시 팝업 노출 확인, 및 닫기 테스트", async () => {
    vi.useFakeTimers();

    renderWithQueryClient();
    const { result } = renderHook(
      () =>
        useMutation({
          ...postProblemAnswerMutationOptions({ problemId: "3" }),
        }),
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ sub: "2" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    act(() => vi.advanceTimersByTime(6000));

    expect(
      screen.getByText(LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.DESCRIPTION),
    ).toBeInTheDocument();
    expect(
      screen.getByText(LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.TITLE),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(`${process.env.NEXT_PUBLIC_FEW_WEB}/article/1`),
    ).toBeInTheDocument();
  });
});
