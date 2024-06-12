import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { apiRoutes } from '@shared/constants/apiRoutes';
import { expect, vi, describe, it, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@mocks/server';
import WorkbookPage from './[id]/page';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

// TBD: 필요하면 vitest.setup.ts 에 빼놓기
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'workbookId') return '1';
      return null;
    },
  }),
  usePathname: () => '/workbook/1',
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt={props.alt} />;
  },
}));

vi.mock('/public/assets/icon36/share_36.svg', () => ({ __esModule: true, default: '' }));
vi.mock('/public/assets/icon36/*', () => ({ __esModule: true, default: '' }));
vi.mock('/public/assets/*', () => ({ __esModule: true, default: '' }));

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('워크북 페이지 테스트', () => {
  it('데이터와 함께 워크북 페이지를 로딩한다', async () => {
    await waitFor(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <WorkbookPage />
        </QueryClientProvider>
      );
    });

    // await waitFor(() => {
    //   expect(screen.getByText('재태크, 투자 필수 용어 모음집')).toBeInTheDocument();
    //   expect(screen.getByText('사회 초년생부터, 직장인, 은퇴자까지 모두가 알아야 할 기본적인 재태크, 투자 필수 용어 모음집 입니다.')).toBeInTheDocument();
    //   expect(screen.getByText('ISA(개인종합자산관리계좌)란?')).toBeInTheDocument();
    // });
  });

  it('데이터 패칭에 실패 했을 때 에러 메시지를 보여준다', async () => {
    // server.use(
    //   http.get(apiRoutes.workbook.replace(':workbookId', '1'), ({ request }) => {
    //     return new HttpResponse(null, { status: 404 });
    //   })
    // );

    // await waitFor(async () => {
    //   render(
    //     <QueryClientProvider client={queryClient}>
    //       <WorkbookPage />
    //     </QueryClientProvider>
    //   );
    // });

    // await waitFor(() => {
    //   expect(screen.getByText(/Error/)).toBeInTheDocument();
    // });
  });
});
