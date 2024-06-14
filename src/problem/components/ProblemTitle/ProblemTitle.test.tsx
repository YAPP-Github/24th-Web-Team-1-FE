import { describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import ProblemTitle from ".";
import { PROBLEM_TITLE_INFO } from "@problem/constants/problemInfo";
import { render, screen, waitFor } from "@testing-library/react";
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
      <ProblemTitle />
    </QueryClientProviders>,
  );
};

describe("퀴즈 정보 불러오기 테스트", () => {
  it("퀴즈 불러와서 페이지에 보이는지 확인", async () => {
    await waitFor(async () => renderWithQueryClient());

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 3 });
      if (PROBLEM_TITLE_INFO.NO_ANSWER.title)
        expect(heading).toHaveTextContent(PROBLEM_TITLE_INFO.NO_ANSWER.title);
      if (PROBLEM_TITLE_INFO.NO_ANSWER.className)
        expect(heading).toHaveClass(PROBLEM_TITLE_INFO.NO_ANSWER.className);

      const subHeading = screen.getByRole("heading", { level: 2 });
      expect(subHeading).toHaveTextContent(
        "ETF(상장지수펀드)의 특징이 아닌것은?",
      );
    });
  });
});
