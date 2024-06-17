import { useForm } from 'react-hook-form';

import { describe, expect, it, vi } from 'vitest';

import SubscribeForm from '.';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockSetIsOpen = vi.fn();
const mockOnSubmit = vi.fn();

vi.mock('@main/hooks/useSubscribeForm', () => ({
  useSubscribeForm: () => ({
    form: useForm(),
    onSubmit: mockOnSubmit,
  }),
}));

describe('SubscribeForm 컴포넌트 동작 테스트', () => {

  it('폼과 필드들을 올바르게 렌더링 한다.', () => {
    render(<SubscribeForm setIsOpen={mockSetIsOpen} />);

    expect(screen.getByPlaceholderText('이메일을 입력해주세요')).toBeInTheDocument();
    expect(screen.getByText('개인정보 수집')).toBeInTheDocument();
    expect(screen.getByText('광고성 정보 수신')).toBeInTheDocument();
    expect(screen.getByText('좀 더 둘러볼래요')).toBeInTheDocument();
    expect(screen.getByText('구독할게요')).toBeInTheDocument();
  });

  it('올바르지 않은 이메일 형식을 검사한다.', async () => {
    render(<SubscribeForm setIsOpen={mockSetIsOpen} />);

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    const submitButton = screen.getByText('구독할게요');

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.findByText('올바른 이메일 형식이 아니에요.')).toBeTruthy();
    })

    // Enter an invalid email
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.findByText('올바른 이메일 형식이 아니에요')).toBeTruthy();
    })
  });

  it('유효한 이메일을 폼에 제출한다.', async () => {
    render(<SubscribeForm setIsOpen={mockSetIsOpen} />);

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    const submitButton = screen.getByText('구독할게요');

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('좀 더 둘러볼래요 버튼 클릭 시 폼을 닫는다.', async () => {
    render(<SubscribeForm setIsOpen={mockSetIsOpen} />);

    const user = userEvent.setup();
    const rejectButton = screen.getByText('좀 더 둘러볼래요');
    await user.click(rejectButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});
