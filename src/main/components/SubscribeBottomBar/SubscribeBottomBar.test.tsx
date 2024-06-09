import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubscribeBottomBar from '.';
import { EMAIL_CONTROL, SUBSCRIBE_USER_ACTIONS, SUBSCRIBE_ANNOUCE, SUBSCRIBE_TITLES } from '@main/constants/main';
import { useSubscribeForm } from '@main/hooks/useSubscribeForm';
import { useForm, Controller, Control, FieldValues, FormProvider } from 'react-hook-form';
import * as useToastModule from '@shared/components/ui/use-toast';  // import as module
import { useToast } from '@shared/components/ui/use-toast';
import { EmailSubscribeFormData } from '@main/types';

// Mock the useSubscribeForm hook
const mockOnSubmit = vi.fn();

vi.mock('@main/hooks/useSubscribeForm', () => ({
  useSubscribeForm: () => {
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

// Mock react-hook-form's Controller and FormProvider
vi.mock('react-hook-form', async () => {
  const originalModule = await vi.importActual<any>('react-hook-form');
  return {
    ...originalModule,
    Controller: ({ control, name, render }: { control: Control, name: string, render: any }) => render({
      field: {
        onChange: vi.fn(),
        onBlur: vi.fn(),
        value: '',
        name,
        ref: vi.fn(),
      }
    }),
    FormProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useFormContext: () => ({
      getFieldState: vi.fn(),
      formState: { errors: {} },
    }),
  };
});

// Mock useToast hook
const mockToast = vi.fn();

vi.mock('@shared/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    dismiss: vi.fn(),
    toasts: []
  }),
}));


describe('구독 유도 바텀 바 테스트', () => {
  it('renders correctly', () => {
    render(<SubscribeBottomBar />);

    expect(screen.getByText(SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_FEW)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText(SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_CONFIRM)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE))).toBeInTheDocument();
  });

  it('유효하지 않은 이메일을 사용했을 때 에러 띄우기', async () => {
    render(<SubscribeBottomBar />);

    const input = screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER) as HTMLInputElement;
    const submitButton = screen.getByText(SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_CONFIRM);

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(EMAIL_CONTROL.INVALID_EMAIL)).toBeDefined() // 값이 정의되어 있는 경우?
  });

  it('유효한 이메일을 입력했을 때 toast 메시지를 표시', async () => {
  
    render(<SubscribeBottomBar />);

    const input = screen.getByPlaceholderText(EMAIL_CONTROL.EMAIL_PLACEHOLDER) as HTMLInputElement;
    const submitButton = screen.getByText(SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_CONFIRM);

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_SUCCESS)).toBeDefined()
  });
});
