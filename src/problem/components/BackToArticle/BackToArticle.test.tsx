import { beforeAll, beforeEach,describe, expect, it, vi } from "vitest";

import BackToArticle from "./";
import { BACK_TO_ARTICLE_WORDS } from "@problem/constants/backToArticle";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueryClientProviders from "@shared/components/queryClientProvider";

// Mocking the useParams hook from next/navigation
vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

const renderWithQueryClient = () => {
    return render(
      <QueryClientProviders>
        <BackToArticle />
      </QueryClientProviders>,
    );
  };

describe("BackToArticle Component 동작 테스트", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
        const actual =
          await vi.importActual<typeof import("next/navigation")>(
            "next/navigation",
          );
        return {
          ...actual,
          useParams: vi.fn(() => ({
            problemId: "1",
          })),
        };
      });
  });

  beforeEach(() => {
    renderWithQueryClient();
  });

  it("아티클 다시보기 버튼 클릭 시 문제에 해당하는 아티클이 보인다.", async () => {
    
    expect(screen.queryByText(BACK_TO_ARTICLE_WORDS.ARTICLE)).toBeInTheDocument();

    const articleLink = screen.getByText(BACK_TO_ARTICLE_WORDS.ARTICLE);
    await userEvent.click(articleLink);

    expect(screen.getByTestId("x-menu")).toBeInTheDocument();
  });

  it("X 버튼 클릭 시 아티클 뷰가 없어진다.", async () => {

    const articleLink = screen.getByText(BACK_TO_ARTICLE_WORDS.ARTICLE);
    await userEvent.click(articleLink);

    const cancelButton = screen.getByTestId("x-menu"); 
    await userEvent.click(cancelButton);

    expect(screen.queryByTestId("x-menu")).not.toBeInTheDocument();
  });
});
