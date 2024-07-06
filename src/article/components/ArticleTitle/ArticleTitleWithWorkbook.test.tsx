import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ArticleTitle from ".";

const paramsGet = vi.fn();

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");

  return {
    ...actual,
    useSearchParams: vi.fn(() => ({
      get: paramsGet.mockReturnValueOnce(() => "1"),
    })),
    useParams: vi.fn(() => ({
      articleId: "1",
      workbookId: "1",
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
  it("워크북 종속 아티클 정보 가져오는 부분 확인", async () => {
    await waitFor(async () => renderWithQueryClient());
    const { result } = renderHook(
      () =>
        useQuery({
          ...getArticleWithWorkbookQueryOptions({
            articleId: "1",
            workbookId: "1",
          }),
        }),
      { wrapper: createQueryProviderWrapper() },
    );

    await waitFor(async () => result.current.isSuccess);

    await waitFor(() => {
      const headingTag = screen.getByRole("heading", { level: 2 });
      screen.debug();
      expect(headingTag).toHaveTextContent("겨울철 노벨상 후보들");
      expect(screen.findByText("Fig.1")).toBeTruthy();
    });
  });
});
