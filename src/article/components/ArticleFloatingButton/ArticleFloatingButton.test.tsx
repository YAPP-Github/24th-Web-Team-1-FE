import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import ArticleFloatingButton from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = vi.fn();
const setProblemIds = vi.fn();

describe("ArticleFloatingButton", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useParams: vi.fn(() => ({
          get: vi.fn().mockReturnValueOnce(() => "1"),
        })),
        useRouter: vi.fn(() => ({
          push,
        })),
      };
    });

    vi.mock("@shared/models/useProblemIdsViewModel", async () => {
      const actual = await vi.importActual<
        typeof import("@shared/models/useProblemIdsViewModel")
      >("@shared/models/useProblemIdsViewModel");
      return {
        ...actual,
        useProblemIdsViewModel: vi.fn(() => ({
          isExistNextProblem: vi.fn(),
          nextSetProblemId: vi.fn(),
          clearProblem: vi.fn(),
          setProblemIds,
          getCurrentProblemId: vi.fn().mockReturnValueOnce("1"),
          getTagCurrentProblemText: vi.fn(),
          currentIdx: 0,
          prevSetProblemId: vi.fn(),
          getArticlePathText: vi.fn(),
          getDayText: vi.fn(),
        })),
      };
    });
  });
  beforeEach(() => {
    render(<ArticleFloatingButton />);
  });

  it("버튼이 잘 렌더링 되는지 테스트 한다.", () => {
    const button = screen.getByText("퀴즈 풀기");
    expect(button).toBeInTheDocument();
  });

  it("플로팅 버튼 클릭 시 문제 풀기로 넘어간다.", async () => {
    const button = screen.getByText("퀴즈 풀기");
    await userEvent.click(button);

    // Ensure that the router's push method was called with the correct path
    expect(push).toHaveBeenCalledWith("/problem/1");
  });
});
