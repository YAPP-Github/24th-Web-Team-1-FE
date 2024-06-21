import { describe, expect,it } from 'vitest';

import Error from './error';
import { render, screen, waitFor } from '@testing-library/react';

describe('Error component', () => {
  it('네트워크 에러 페이지 렌더링', async () => {
    const error = { statusCode: 503 };
    render(<Error error={error} />);
    
    await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('네트워크 연결에 실패했어요. 확인 후 다시 시도해주세요.')).toBeInTheDocument();
        expect(screen.getByText('다시 시도하기')).toBeInTheDocument();
    })
  });

  it('renders general error message', () => {
    const error = { statusCode: 400, message: 'Bad Request' };
    render(<Error error={error} />);
    
    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByText('Bad Request')).toBeInTheDocument();
  });

  it('renders default error message', () => {
    const error = { statusCode: 400 };
    render(<Error error={error} />);
    
    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByText('잠시 후 다시 시도해 주세요.')).toBeInTheDocument();
  });
});
