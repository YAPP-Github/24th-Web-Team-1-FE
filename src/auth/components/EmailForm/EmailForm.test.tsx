import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useToast } from "@shared/components/ui/use-toast";
import { EMAIL_CONTROL } from "@subscription/constants/subscribe";
import EmailForm from ".";
import "@testing-library/jest-dom";
import { LOGIN_OR_SIGNUP } from "@auth/constants/auth";
import { useEmailForm } from "@auth/hooks/useEmailForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockOnSubmit = vi.fn();

vi.mock("@auth/hooks/useEmailForm", () => ({
  useEmailForm: () => ({
    form: useForm(),
    onSubmit: mockOnSubmit,
  }),
}));

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockToast = {
  toast: vi.fn(),
};

vi.mock("@shared/components/ui/use-toast", () => ({
  useToast: () => mockToast,
}));

describe("이메일 폼 컴포넌트", () => {
  const mockForm = {
    handleSubmit: vi.fn(),
    control: {},
    formState: { errors: {} },
  };

  const queryClient = new QueryClient();

  const renderWithClient = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <EmailForm />
      </QueryClientProvider>,
    );
  };

  it("폼을 렌더링해야 한다", () => {
    renderWithClient();
    expect(
      screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER),
    ).toBeInTheDocument();
    expect(screen.getByText(LOGIN_OR_SIGNUP)).toBeInTheDocument();
  });

  it("올바르지 않은 이메일 형식에 에러 메시지를 보여줘야 한다", async () => {
    const user = userEvent.setup();

    renderWithClient();

    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

    const emailInput = screen.getByPlaceholderText(
      EMAIL_CONTROL.EMAIL_PLACEHOLDER,
    );
    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.findByText(EMAIL_CONTROL.INVALID_EMAIL)).toBeTruthy();
    });
  });

  it("폼 제출 시 onSubmit을 호출해야 한다", async () => {
    const user = userEvent.setup();

    renderWithClient();

    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("성공적인 제출 후 검증 페이지로 이동해야 한다", async () => {
    const email = "test@example.com"
    mockOnSubmit.mockImplementationOnce((values) => {
      const response = { data: { data: { sendAuth: true } } };
      response.data?.data?.sendAuth &&
        mockPush(`/auth/validation?email=${email}`);
    });

    const user = userEvent.setup();

    renderWithClient();
    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(`/auth/validation?email=${email}`);
      
    });
  });

  it("제출 실패 시 토스트 메시지를 보여줘야 한다", async () => {
    mockOnSubmit.mockImplementationOnce(() => {
      mockToast.toast({ title: "Fail message" });
    });

    const user = userEvent.setup();

    renderWithClient();
    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockToast.toast).toHaveBeenCalledWith({ title: "Fail message" });
    });
  });
});
