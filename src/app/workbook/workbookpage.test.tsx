import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { apiRoutes } from '@shared/constants/apiRoutes';
import { expect, vi, describe, it } from 'vitest';
import { server } from '@mocks/server';
import WorkbookPage from './[id]/page';

// Mock useSearchParams to return the expected query params
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'workbookId') return '1';
      return null;
    },
  }),
}));

const queryClient = new QueryClient();


describe('워크북 페이지 테스트', () => {
  it('데이터와 함께 워크북 페이지를 로딩한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WorkbookPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Workbook landing image')).toBeInTheDocument();
      expect(screen.getByText('재태크, 투자 필수 용어 모음집')).toBeInTheDocument();
      expect(screen.getByText('사회 초년생부터, 직장인, 은퇴자까지 모두가 알아야 할 기본적인 재태크, 투자 필수 용어 모음집 입니다.')).toBeInTheDocument();
      expect(screen.getByText('ISA(개인종합자산관리계좌)란?')).toBeInTheDocument();
    });
  });

  it('데이터 패칭에 실패 했을 때 에러 메시지를 보여준다', async () => {
    server.use(
      http.get(apiRoutes.workbook.replace(':workbookId', '1'), ({ request }) => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <WorkbookPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});
