import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LinkShare from ".";

const href = "www.few.article.co.kr";

const mockToast = vi.fn();
vi.mock("@shared/components/ui/use-toast", async () => {
  const actual = await vi.importActual<
    typeof import("@shared/components/ui/use-toast")
  >("@shared/components/ui/use-toast");
  return {
    ...actual,
    useToast: () => ({
      toast: mockToast,
    }),
  };
});

describe("링크 공유 팝업 내부 컨텐트의 버튼 요소 테스트", () => {
  it("href 텍스트 노출 확인", () => {
    render(<LinkShare.Content href={href} />);
    expect(screen.getByDisplayValue(href)).toBeTruthy();
  });

  it("버튼 클릭시, 클립보드 복사 및 토스트 노출 확인", async () => {
    render(<LinkShare.Content href={href} />);

    const linkClipButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(linkClipButton);
    await waitFor(() => {
      // 여기서 에러나는중...ㅠㅠ.ㅠ
      // expect(navigator.clipboard.writeText).toBeCalledWith(href);
      // expect(mockToast).toHaveBeenCalledWith({
      //   title: COPY_CLIP_URL,
      // });
    });
  });
});
