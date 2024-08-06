import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { SIGNUP_COMPLETED } from "@auth/constants/auth";
import { COOKIES } from "@shared/constants/token";
import { render, screen, waitFor } from "@testing-library/react";
import ValidationCompletePage from "./page";

// Mocking useRouter
const mockPush = vi.fn();

describe("ValidationCompletePage 페이지 테스트", () => {
  const queryClient = new QueryClient();

  const renderWithClient = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ValidationCompletePage />
      </QueryClientProvider>,
    );
  };

  beforeAll(() => {
    vi.mock("next/navigation", async () => {
      const actual =
        await vi.importActual<typeof import("next/navigation")>(
          "next/navigation",
        );
      return {
        ...actual,
        useSearchParams: vi.fn(() => ({
          get: vi.fn().mockReturnValueOnce(() => "test-token"),
        })),
        useRouter: vi.fn(() => ({
          mockPush,
        })),
      };
    });
  });

  beforeEach(() => {
    renderWithClient();
  });

  it("인증을 완료하고 쿠키를 세팅한다.", async () => {
    await waitFor(() => {
      expect(document.cookie).toContain(
        `${COOKIES.ACCESS_TOKEN}=${COOKIES.ACCESS_TOKEN}`,
      );
      expect(document.cookie).toContain(
        `${COOKIES.REFRESH_TOKEN}=${COOKIES.REFRESH_TOKEN}`,
      );
    });
  });

  it("컴포넌트 내 요소들을 올바르게 렌더링 한다.", () => {
    expect(screen.getByText(SIGNUP_COMPLETED.GRETTING)).toBeInTheDocument();
    expect(screen.getByText(SIGNUP_COMPLETED.INTRO)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: SIGNUP_COMPLETED.MAIN_BUTTON }),
    ).toBeInTheDocument();
  });
});
