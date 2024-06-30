import { beforeAll, describe, expect, it, vi } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";

import UnsubscribeLayout from "./layout";
import UnsubscribePage from "./page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach } from "node:test";

const push = vi.fn();
const back = vi.fn();

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push,
      back,
    })),
  };
});

vi.mock("@subscription/hooks/useArticleInfo", () => ({
  useArticleInfo: vi.fn().mockReturnValue({
    articleId: "123",
    workbookId: "456",
  }),
}));

describe("UnsubscribePage 동작 테스트", () => {
  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push,
          back,
        })),
      };
    });
  });

  beforeEach(() => {
    vi.mock("@subscription/hooks/useArticleInfo", () => ({
        useArticleInfo: vi.fn().mockReturnValue({
          articleId: "123",
          workbookId: "456",
        }),
      }));
  });

  it("Topbar 의 뒤로 가기를 클릭 했을 때 특정 워크북의 아티클 페이지로 이동한다", async () => {
    render(
      <QueryClientProviders>
        <UnsubscribeLayout>
          <UnsubscribePage />
        </UnsubscribeLayout>
      </QueryClientProviders>,
    );

    const user = userEvent.setup();
    const backButton = screen.getByTestId("back-icon");
    await user.click(backButton);

    expect(push).toHaveBeenCalledWith("/article/123?workbookId=456");
  });
});
