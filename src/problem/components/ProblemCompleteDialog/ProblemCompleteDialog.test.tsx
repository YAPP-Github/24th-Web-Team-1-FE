import { beforeAll, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import ProblemCompleteDialog from ".";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { postProblemAnswerMutationOptions } from "@problem/remotes/postProblemAnswerOption";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import { QUERY_KEY } from "@problem/remotes/api";
import { ApiResponse } from "@api/api-config";
import { AnswerCheckInfo } from "@problem/types/problemInfo";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";

const isExistNextProblem = vi.fn(() => false);
const renderWithQueryClient = () => {
  return render(
    <QueryClientProviders>
      <ProblemCompleteDialog />
    </QueryClientProviders>,
  );
};

describe("마지막 선택지 제출완료시 팝업 노출 테스트", () => {
  beforeAll(() => {
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
          getTagCurrentProblemText: vi.fn(() => "3/3"),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
        })),
      };
    });
  });
  it("정답 mutation 호출시 팝업 노출 확인, 및 닫기 테스트", async () => {
    renderWithQueryClient();
    const { result } = renderHook(
      () =>
        useMutation({
          ...postProblemAnswerMutationOptions({ problemId: "1" }),
        }),
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ sub: "2" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(
      screen.getByText(LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.DESCRIPTION),
    ).toBeInTheDocument();
    expect(
      screen.getByText(LINK_SHARE_CONTENT.ALL_PROBLEM_SUBMIT.TITLE),
    ).toBeInTheDocument();
  });
});
