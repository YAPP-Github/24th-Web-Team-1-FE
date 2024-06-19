import { useForm } from "react-hook-form";

import { describe, expect, it, vi } from "vitest";

import {
    UNSUBSCRIBE_CONFIRM,
  UNSUBSCRIBE_FORM,
} from "@workbook/constants/unsubscribe";
import { unSubscribeSchema } from "@workbook/schemas";
import { UnsubscribeFormData } from "@workbook/types";

import UnsubscribeForm from ".";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToast = vi.fn();
vi.mock("@shared/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

const mockOnSubmit = vi.fn(async (values: UnsubscribeFormData) => {
    const result = unSubscribeSchema.safeParse(values);
    // 성공 케이스 시 toast 호출 로직 포함
    if (result.success) {
      mockToast({ title: UNSUBSCRIBE_CONFIRM });
    }
  });

vi.mock("@workbook/hooks/useUnsubscribeForm", () => ({
  useUnsubscribeForm: () => ({
    form: useForm(),
    onSubmit: mockOnSubmit,
  }),
}));

describe("UnsubscribeForm 컴포넌트 동작 테스트", () => {
  it("폼과 필드들을 올바르게 렌더링 한다.", () => {
    render(<UnsubscribeForm />);

    expect(
      screen.getByPlaceholderText(UNSUBSCRIBE_FORM.PLACEHOLDER),
    ).toBeInTheDocument();
    expect(screen.getByText(UNSUBSCRIBE_FORM.TITLE)).toBeInTheDocument();
    expect(screen.getByText(UNSUBSCRIBE_FORM.DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(UNSUBSCRIBE_FORM.BACK)).toBeInTheDocument();
    expect(screen.getByText(UNSUBSCRIBE_FORM.CONFIRM)).toBeInTheDocument();
  });

  it("입력 글자 수가 255자를 초과하지 않도록 한다.", async () => {
    render(<UnsubscribeForm />);

    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText(
      UNSUBSCRIBE_FORM.PLACEHOLDER,
    ) as HTMLTextAreaElement;
    const longText = "a".repeat(256);

    await user.type(textarea, longText);

    await waitFor(() => {
      expect(textarea.value.length).toBe(255);
    });
  });

  it("취소 사유를 폼에 제출한다.", async () => {
    render(<UnsubscribeForm />);

    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText(UNSUBSCRIBE_FORM.PLACEHOLDER);
    const submitButton = screen.getByRole("button", {
      name: UNSUBSCRIBE_FORM.CONFIRM,
    });

    await user.type(
      textarea,
      "현생이 바빠서 뉴스레터를 읽을 시간이 없어요. 현생이 바빠서 뉴스레터를 읽을 시간이 없어요.현생이 바빠서 뉴스레터를 읽을 시간이 없어요.현생이 바빠서 뉴스레터를 읽을 시간이 없어요.레터를 읽을 시간이 없어요요",
    );
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: UNSUBSCRIBE_CONFIRM,
      });
    });
  });

  /** TBD: 개발 필요 */
  //   it('레터로 돌아가기 버튼 클릭 시 이메일에서 보낸 아티클 페이지로 이동한다.', async () => {
  //     render(<UnsubscribeForm />);

  //     const user = userEvent.setup();
  //     const backButton = screen.getByText(UNSUBSCRIBE_FORM.BACK);
  //     await user.click(backButton);

  //     expect(mockOnSubmit).not.toHaveBeenCalled();
  //   });
});
