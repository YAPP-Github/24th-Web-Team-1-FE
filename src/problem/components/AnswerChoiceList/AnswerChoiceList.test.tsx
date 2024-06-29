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
    useParams: vi.fn(() => ({
      problemId: "1",
    })),
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
    const { container } = renderWithQueryClient();
    const { result } = renderHook(
      () =>
        useQuery({
          ...getProblemQueryOptions({ problemId: "1" }),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => result.current.isLoading);
    expect(container.firstChild?.childNodes[1]).toHaveClass("skeleton");

    await waitFor(() => result.current.isSuccess);

    expect(screen.getByText("냄비에 물을 끓이는 번거로움"));
    expect(screen.getByText("가스를 배기하는 장치의 부족"));
    expect(screen.getByText("찬물을 데우는 시간"));
    expect(screen.getByText("온수기의 크기"));
  });
});
