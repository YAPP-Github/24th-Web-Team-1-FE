import { beforeAll, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import { getProblemsQueryOptions } from "@problem/remotes/getProblemsQueryOptions";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { render, renderHook, waitFor } from "@testing-library/react";
import ProblemLayout from "./layout";
import ProblemPage from "./page";

const push = vi.fn();
const setProblemIds = vi.fn();

describe("UnsubscribePage 동작 테스트", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useSearchParams: vi.fn(() => ({
          get: vi.fn().mockReturnValueOnce(() => "1"),
        })),
        useRouter: vi.fn(() => ({
          push,
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
          isExistNextProblem: vi.fn(),
          nextSetProblemId: vi.fn(),
          clearProblem: vi.fn(),
          setProblemIds,
          getCurrentProblemId: vi.fn(),
          getTagCurrentProblemText: vi.fn(),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
          getArticlePathText: vi.fn(),
          getDayText: vi.fn(),
        })),
      };
    });
  });

  it("query string에 아티클 아이디가 들어있는 경우, 데이터 패칭 이후 전역상태 지정하고 문제풀이 페이지로 이동하기", async () => {
    render(
      <QueryClientProviders>
        <ProblemLayout>
          <ProblemPage />
        </ProblemLayout>
      </QueryClientProviders>,
    );

    const { result } = renderHook(
      () =>
        useQuery({
          ...getProblemsQueryOptions({ articleId: "1" }),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    waitFor(() => result.current.isSuccess);
    waitFor(() => expect(result.current.data?.problemIds).toEqual([1, 2, 3]));
    waitFor(() => {
      expect(setProblemIds).toBeCalled();
      expect(push).toHaveBeenNthCalledWith(1, "/problem/2");
    });
  });
});
