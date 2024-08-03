import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it } from "vitest";
import MainHeader from ".";

const renderComponent = () => {
  return render(<MainHeader />);
};

describe("헤더 햄버거바 테스트", () => {
  beforeEach(() => {
    renderComponent();
  });
  it("햄버거 바 노출되고, 클릭하면 메뉴가 나타난다.", async () => {
    const hamburgerMenu = screen.getByTestId("hamburger-menu");

    await userEvent.click(hamburgerMenu);

    const loginOrSignup = screen.getByText("로그인 또는 회원가입");
    const withFewWork = screen.getByText("FEW와 협업하려면");
    const instagram = screen.getByText("인스타그램");

    const xMenu = screen.getByTestId("x-menu");

    await userEvent.click(xMenu);
  });
});
