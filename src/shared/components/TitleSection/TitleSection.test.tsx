import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WriterInfo from "@article/components/WriterInfo";
import TitleSection from ".";
import userEvent from "@testing-library/user-event";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";

vi.mock("next/navigation", () => {
  return {
    usePathname: () => ({
      pathname: "",
    }),
  };
});
const titleSectionProps = {
  category: "경제",
  title: "재태크, 투자 필수 용어 모음집",
  editorComponent: <WriterInfo name="안나포" url="" id={1} />,
};

describe("타이틀 섹션 내부 공유하기 버튼 동작 확인하기", () => {
  it("공유하기 아이콘 클릭하면 모달 열리기 테스트", async () => {
    render(<TitleSection {...titleSectionProps} />);

    const user = userEvent.setup();
    const shareIconButton = screen.getByRole("button");

    await user.click(shareIconButton);

    const dialogTitle = screen.getByRole("heading");
    expect(dialogTitle).toHaveTextContent(
      LINK_SHARE_CONTENT.ARTICLE_INFO.TITLE,
    );

    const dialogDescription = screen.getByRole("paragraph");
    expect(dialogDescription).toHaveTextContent(
      LINK_SHARE_CONTENT.ARTICLE_INFO.DESCRIPTION,
    );
  });
});
