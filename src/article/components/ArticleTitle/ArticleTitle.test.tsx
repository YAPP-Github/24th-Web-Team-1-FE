import QueryClientProviders from "@shared/components/queryClientProvider";
import { render, renderHook, waitFor, screen } from "@testing-library/react";
import ArticleTitle from ".";
import { describe, expect, it, vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");

  return {
    ...actual,
    useParams: vi.fn(() => ({
      articleId: "1",
    })),
  };
});

const renderWithQueryClient = () => {
  return render(
    <QueryClientProviders>
      <ArticleTitle />
    </QueryClientProviders>,
  );
};

describe("아티클의 타이틀 영역 데이터 잘 노출되는지 확인", () => {
  it("아티클 정보 가져오는 부분 확인", async () => {
    await waitFor(async () => renderWithQueryClient());
    const { result } = renderHook(
      () => useQuery({ ...getArticleQueryOptions({ articleId: "1" }) }),
      { wrapper: createQueryProviderWrapper() },
    );

    await waitFor(async () => result.current.isSuccess);
    await waitFor(() => {
      const headingTag = screen.getByRole("heading", { level: 1 });
      expect(headingTag).toHaveTextContent("재태크, 투자 필수 용어 모음집");

      expect(screen.findByText("안나포")).toBeTruthy();
    });
  });
});
