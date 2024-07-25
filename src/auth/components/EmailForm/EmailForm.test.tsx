import { useForm } from 'react-hook-form';

import { describe, expect, it, vi } from 'vitest';

import { EMAIL_CONTROL } from '@subscription/constants/subscribe';

import EmailForm from '.';
import { LOGIN_OR_SIGNUP, LOGIN_STATUS } from '@auth/constants/auth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock the useSubscribeForm hook
const mockOnSubmit = vi.fn();

vi.mock('@auth/hooks/useEmailForm', () => ({
    useEmailForm: () => {
    const form = useForm({
      resolver: async (data) => {
        const errors: { email?: { type: string; message: string } } = {};
        if (data.email && !data.email.includes('@')) {
          errors.email = {
            type: 'manual',
            message: EMAIL_CONTROL.INVALID_EMAIL,
          };
        }
        return {
          values: Object.keys(errors).length ? {} : data,
          errors: errors,
        };
      },
    });
    return { form, onSubmit: mockOnSubmit };
  },
}));

// Mock useToast hook
const mockToast = vi.fn();

vi.mock('@shared/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    dismiss: vi.fn(),
    toasts: []
  }),
}));


describe('이메일 인풋 UI 테스트', () => {
  it('유효하지 않은 이메일을 사용했을 때 에러 띄우기', async () => {
    render(<EmailForm />);

    const input = screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER) as HTMLInputElement;
    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(EMAIL_CONTROL.INVALID_EMAIL)).toBeDefined() 
    })
  });

  it('유효한 이메일을 입력했을 때 toast 메시지를 표시', async () => {
  
    render(<EmailForm />);

    const input = screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER) as HTMLInputElement;
    const submitButton = screen.getByText(LOGIN_OR_SIGNUP);

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(LOGIN_STATUS.COMPLETED)).toBeDefined()
    })
  });
});
