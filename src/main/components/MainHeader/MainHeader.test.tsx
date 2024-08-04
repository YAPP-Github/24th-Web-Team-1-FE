import useIsLogin from "@shared/hooks/useIsLogin";
import { tokenParse } from "@shared/utils/tokenParse";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getCookie } from "cookies-next";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
const back = vi.fn();

import QueryClientProviders from "@shared/components/queryClientProvider";
import MainHeader from ".";
vi.mock("@shared/hooks/useIsLogin", () => ({
  default: vi.fn(),
}));

vi.mock("cookies-next", () => ({
  getCookie: vi.fn(),
}));
vi.mock("@shared/utils/tokenParse", () => ({
  tokenParse: vi.fn(),
}));
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
const renderComponent = () => {
  return render(
    <QueryClientProviders>
      <MainHeader />
    </QueryClientProviders>,
  );
};

describe("헤더 햄버거바 테스트", () => {
  beforeEach(() => {
    renderComponent();
  });
  it("햄버거 바 노출되고, 비로그인시, 클릭하면 비로그인 아이템 메뉴가 나타난다.", async () => {
    (useIsLogin as Mock).mockReturnValue(false);

    const hamburgerMenu = screen.getByTestId("hamburger-menu");

    await userEvent.click(hamburgerMenu);

    const loginOrSignup = screen.getByText("로그인 또는 회원가입");
    const withFewWork = screen.getByText("FEW와 협업하려면");
    const instagram = screen.getByText("인스타그램");
    screen.debug();
    const xMenu = screen.getByTestId("x-menu");

    await userEvent.click(xMenu);
  });
  it("햄버거 바 노출되고, 로그인시, 클릭하면 로그인 아이템 메뉴가 나타난다.", async () => {
    (useIsLogin as Mock).mockReturnValue(true);
    (getCookie as Mock).mockReturnValue("mocked_token");
    (tokenParse as Mock).mockReturnValue({ memberEmail: "test@example.com" });

    const hamburgerMenu = screen.getByTestId("hamburger-menu");

    await userEvent.click(hamburgerMenu);

    expect(screen.getByText("내 이메일"));
    expect(screen.getByText("test@example.com"));
  });
});
