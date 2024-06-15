import { useQuery } from "@tanstack/react-query";

import { describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

import AnswerChoiceList from ".";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

vi.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
    useParams: () => ({
      get: () => {},
      query: {
        problemId: "1",
      },
    }),
  };
});

const renderWithQueryClient = () => {
  return render(
    <QueryClientProviders>
      <AnswerChoiceList />
    </QueryClientProviders>,
  );
};

describe("선택지 불러오고, 버튼 클릭으로 버튼 ui 변경", () => {
  it("contents 불러오는지 확인", async () => {
    await waitFor(() => renderWithQueryClient());
    const { result } = renderHook(
      () =>
        useQuery({
          ...getProblemQueryOptions({ problemId: 1 }),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => result.current.isSuccess);

    expect(screen.getByText("유동성"));
    expect(screen.getByText("분산투자"));
    expect(screen.getByText("높은 운용 비용"));
    expect(screen.getByText("투명성"));
  });
});
