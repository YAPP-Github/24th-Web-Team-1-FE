import { usePathname } from 'next/navigation';

import { describe, expect, it, Mock, vi } from 'vitest';

import useWorkbookId from '@shared/hooks/useWorkbookId';

import { CurriculumInfo } from '@workbook/types';

import CurriculumItem from '.';
import { render } from '@testing-library/react';

// Mock the necessary hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('@shared/hooks/useWorkbookId', () => ({
  default: vi.fn(),
}));

describe('CurriculumItem 컴포넌트 테스트', () => {
  it('CurriculumItem 이 렌더링이 잘 되는지 확인한다.', () => {
    const mockPathname = '/workbook';
    const mockWorkbookId = '1';
    const mockItem: CurriculumInfo = { id: 1, title: 'Test Title' };

    (usePathname as Mock).mockReturnValue(mockPathname);
    (useWorkbookId as Mock).mockReturnValue(mockWorkbookId);

    const { getByText } = render(<CurriculumItem day={1} item={mockItem} />);

    expect(getByText('Day 1')).toBeInTheDocument();
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('링크 이동 시 workbookId 를 쿼리 스트링으로 포함하는지 확인한다.', () => {
    const mockPathname = '/workbook';
    const mockWorkbookId = '1';
    const mockItem: CurriculumInfo = { id: 1, title: 'Test Title' };

    (usePathname as Mock).mockReturnValue(mockPathname);
    (useWorkbookId as Mock).mockReturnValue(mockWorkbookId);

    const { getByRole } = render(<CurriculumItem day={1} item={mockItem} />);

    const link = getByRole('link');

    expect(link).toHaveAttribute('href', '/article/1?workbookId=1');
  });
});
