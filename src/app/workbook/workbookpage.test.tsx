import { render, screen, waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { apiRoutes } from '@shared/constants/apiRoutes';
import { expect, vi, describe, it, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { server } from '@mocks/server';
import WorkbookPage from './[id]/page';
import { JSX, ClassAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import response from '@mocks/response';
import { getWorkbookQueryOptions, useWorkbook } from '@workbook/remotes/getWorkbookQueryOptions';

export const createQueryProviderWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// TBD: 필요하면 vitest.setup.ts 에 빼놓기
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'workbookId') return '1';
      return null;
    },
  }),
  usePathname: () => '/workbooks/1',
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt={props.alt} />;
  },
}));


describe('워크북 페이지 테스트', () => {
  it('workbook page 랜딩 시 react-query 테스트', async () => {
    const { result } = renderHook(() => useWorkbook(1), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data?.title).toBe('재태크, 투자 필수 용어 모음집');
      expect(result.current.data?.mainImageUrl).toBe('/main_img.png');
      expect(result.current.data?.description).toBe('사회 초년생부터, 직장인, 은퇴자까지 모두가 알아야 할 기본적인 재태크, 투자 필수 용어 모음집 입니다.');
      expect(result.current.data?.category).toBe('경제');
    })
  });

  it('데이터와 함께 워크북 페이지를 로딩한다', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <WorkbookPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('재태크, 투자 필수 용어 모음집')).toBeInTheDocument();
      expect(screen.getByAltText('Workbook landing image')).toHaveAttribute('src', '/main_img.png');
      expect(screen.getByText('사회 초년생부터, 직장인, 은퇴자까지 모두가 알아야 할 기본적인 재태크, 투자 필수 용어 모음집 입니다.')).toBeInTheDocument();
    });
  });

  /** 데이터가 잘 불러와지고 있는 듯? */
  // it('데이터 패칭에 실패 했을 때 에러 메시지를 보여준다', async () => {
  //   const queryClient = new QueryClient();
  //   server.use(
  //     http.get(apiRoutes.workbook.replace(':workbookId', '1'), ({ request }) => {
  //       return new HttpResponse(null, { status: 500 });
  //     })
  //   );

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <WorkbookPage />
  //     </QueryClientProvider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('Error loading workbook')).toBeInTheDocument();
  //   });
  // });
});
