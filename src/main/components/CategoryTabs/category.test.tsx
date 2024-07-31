import { CategoryInfo } from "@common/types/category";
import { getWorkbookCategoryQueryOptions } from "@main/remotes/getWorkbookCategoryQueryOptions";
import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CategoryTabs from ".";

const categoryTabsProps = {
  type: "WORKBOOK" as const,
  category: { code: 0, name: "" },
  handleCategory: (category: CategoryInfo) => vi.fn(),
};

describe("카테고리 리스트 테스트", () => {
  beforeEach(() => {
    render(
      <QueryClientProviders>
        <CategoryTabs {...categoryTabsProps} />
      </QueryClientProviders>,
    );
  });
  it("공유하기 아이콘 클릭하면 모달 열리기 테스트", async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          ...getWorkbookCategoryQueryOptions(),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    screen.debug();
    expect(screen.getByText("경제"));
    expect(screen.getByText("IT"));
    expect(result.current.data?.length === 5).toBeTruthy();
  });
});
