import { describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import ProblemTitle from ".";
import { PROBLEM_TITLE_INFO } from "@problem/constants/problemInfo";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { getProblemQueryOptions } from "@problem/remotes/getProblemQueryOptions";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useParams: vi.fn(() => ({
      problemId: "1",
    })),
  };
});
const renderWithQueryClient = () => {
  return render(
    <QueryClientProviders>
      <ProblemTitle />
    </QueryClientProviders>,
  );
};

describe("퀴즈 정보 불러오기 테스트", () => {
  it("퀴즈 불러와서 페이지에 보이는지 확인", async () => {
    const { container } = renderWithQueryClient();
    const { result } = renderHook(
      () => useQuery({ ...getProblemQueryOptions({ problemId: "1" }) }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => expect(result.current.isLoading).toBeTruthy());
    expect(container.firstChild?.childNodes[1]).toHaveClass("skeleton");
    expect(container.firstChild?.childNodes[2]).toHaveClass("skeleton");

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    await waitFor(
      () => {
        const heading = screen.getByRole("heading", { level: 3 });
        if (PROBLEM_TITLE_INFO.NO_ANSWER.title)
          expect(heading).toHaveTextContent(PROBLEM_TITLE_INFO.NO_ANSWER.title);
        if (PROBLEM_TITLE_INFO.NO_ANSWER.className)
          expect(heading).toHaveClass(PROBLEM_TITLE_INFO.NO_ANSWER.className);

        const subHeading = screen.getByRole("heading", { level: 2 });
        expect(subHeading).toHaveTextContent(
          "ETF(상장지수펀드)의 특징이 아닌것은?",
        );
      },
      { timeout: 500 },
    );
  });
});
