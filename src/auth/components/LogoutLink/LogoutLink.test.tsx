import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { COOKIES } from "@shared/constants/token";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { deleteCookie } from "cookies-next";
import LogoutLink from ".";

const mockPush = vi.fn();
const mockHandleLogout = vi.fn(() => {
  deleteCookie(COOKIES.ACCESS_TOKEN);
  deleteCookie(COOKIES.REFRESH_TOKEN);
  mockPush("/auth");
});

vi.mock("@auth/hooks/useLogout", () => ({
  useLogout: () => mockHandleLogout,
}));

describe("LogoutLink 컴포넌트 테스트", () => {
  const queryClient = new QueryClient();

  const renderWithClient = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <LogoutLink title={"로그아웃"} />
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
        useRouter: vi.fn(() => ({
          mockPush,
        })),
      };
    });
  });

  beforeEach(() => {
    renderWithClient();
  });

  it("로그아웃 시 쿠키를 모두 삭제하고 로그인 페이지로 이동한다.", async () => {
    const user = userEvent.setup();

    const logoutButton = screen.getByText("로그아웃");
    await user.click(logoutButton);

    await waitFor(() => {
      expect(document.cookie).not.toContain(
        `${COOKIES.ACCESS_TOKEN}=${COOKIES.ACCESS_TOKEN}`,
      );
      expect(document.cookie).not.toContain(
        `${COOKIES.REFRESH_TOKEN}=${COOKIES.REFRESH_TOKEN}`,
      );
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
