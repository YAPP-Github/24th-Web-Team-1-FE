import { ENTIRE_CATEGORY } from "@main/constants";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { getWorkbookCategoryQueryOptions } from "@main/remotes/getWorkbookCategoryQueryOptions";
import { getWorkbooksWithCategoryQueryOptions } from "@main/remotes/getWorkbooksWithCategoryQueryOptions";
import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import { useQueries, useQuery } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WorkbookCardsWrapper from ".";
const push = vi.fn();
const renderWithQuery = () => {
  return render(
    <QueryClientProviders>
      <WorkbookCardsWrapper />
    </QueryClientProviders>,
  );
};

describe("메인페이지 내 카테고리별 워크북 카드 리스트 테스트", () => {
  beforeEach(async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push,
        })),
      };
    });
    vi.mock("@main/hooks/useCategory", async () => {
      const actual = await vi.importActual<
        typeof import("@main/hooks/useCategory")
      >("@main/hooks/useCategory");
      return {
        ...actual,
        category: { code: -1, name: "전체" },
      };
    });

    renderWithQuery();

    const { result } = renderHook(
      () => useQuery({ ...getWorkbookCategoryQueryOptions() }),
      { wrapper: createQueryProviderWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("카테로리 바꾸기 테스트", async () => {
    await waitFor(async () => {
      const allTab = screen.getByRole("tab", { name: "전체" });
      expect(allTab.childNodes.length).toBe(2);

      const economyTab = screen.getByRole("tab", { name: "경제" });
      await userEvent.click(economyTab);

      expect(allTab.childNodes.length).toBe(1);
      expect(economyTab.childNodes.length).toBe(2);
    });
  });

  it("로그인 상태이고, cardtype LEARN 일때, 바텀 버튼 클릭 테스트", async () => {
    vi.mock("@shared/hooks/useIsLogin", async () => {
      const actual = await vi.importActual<
        typeof import("@shared/hooks/useIsLogin")
      >("@shared/hooks/useIsLogin");
      return {
        ...actual,
        isLogin: true,
      };
    });
    const { result: workbookListResult } = renderHook(
      () =>
        useQueries({
          queries: [
            getWorkbooksWithCategoryQueryOptions({
              code: ENTIRE_CATEGORY,
            }),
            {
              ...getSubscriptionWorkbooksQueryOptions(),
              enabled: true,
            },
          ],
        }),
      { wrapper: createQueryProviderWrapper() },
    );

    await waitFor(() => {
      workbookListResult.current.forEach((value) => {
        expect(value.isSuccess).toBeTruthy();
      });
    });

    await waitFor(async () => {
      const day1LearnButton = screen.getByText("Day 1 학습하기");
      await userEvent.click(day1LearnButton);

      expect(push).toHaveBeenNthCalledWith(1, "/article/undefined");
    });
  });
});
