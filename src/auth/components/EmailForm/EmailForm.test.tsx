import { useForm } from "react-hook-form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { EMAIL_CONTROL } from "@subscription/constants/subscribe";

import EmailForm from ".";
import "@testing-library/jest-dom";
import { LOGIN_OR_SIGNUP, SIGNUP_PROGRESS } from "@auth/constants/auth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOnSubmit = vi.fn();
const mockPush = vi.fn();

vi.mock("@auth/hooks/useEmailForm", () => ({
  useEmailForm: () => ({
    form: useForm(),
    onSubmit: mockOnSubmit,
    goToPendingPage: mockPush
  }),
}));

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
  const queryClient = new QueryClient();

  const renderWithClient = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <EmailForm />
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
  })

  it("폼을 렌더링해야 한다", () => {
    expect(
      screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER),
    ).toBeInTheDocument();
    expect(screen.getByText(LOGIN_OR_SIGNUP)).toBeInTheDocument();
  });

//   it("올바르지 않은 이메일 형식에 에러 메시지를 보여줘야 한다", async () => {
//     const user = userEvent.setup();


//     const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

//     const emailInput = screen.getByPlaceholderText(
//       EMAIL_CONTROL.EMAIL_PLACEHOLDER,
//     );
//     await user.type(emailInput, "invalid-email");
//     await user.click(submitButton);

//     await waitFor(() => {
//       expect(screen.findByText(EMAIL_CONTROL.INVALID_EMAIL)).toBeTruthy();
//     });
//   });


//   it("로그인 버튼을 클릭 하면 검증 페이지로 이동해야 한다", async () => {
//     const email = "test@example.com";
//     const user = userEvent.setup();

//     const emailInput = screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER);
//     await user.type(emailInput, email);  // Type the email into the input field

//     const submitButton = screen.getByText(LOGIN_OR_SIGNUP);
//     await user.click(submitButton);  // Click the submit button

//     await waitFor(() => {
//         expect(mockPush).toHaveBeenCalledWith(`/auth/validation?email=${email}`);  
//     });
// });

  // it("제출 실패 시 토스트 메시지를 보여줘야 한다", async () => {
  //   mockOnSubmit.mockImplementationOnce(() => {
  //     mockToast.toast({ title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL });
  //   });

  //   const user = userEvent.setup();

  //   const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

  //   await user.click(submitButton);

  //   await waitFor(() => {
  //     expect(mockOnSubmit).toHaveBeenCalled();
  //     expect(mockToast.toast).toHaveBeenCalledWith({ title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL, });
  //   });
  // });
});
