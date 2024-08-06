import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import queryClient from "@api/queryClient";

import { WORKBOOK_BTNS } from "@workbook/constants/buttons";

import WorkbookButton from ".";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockRouterPush = vi.fn();
const mockPostSubscribeWorkbook = vi.fn();

describe("WorkbookButton 컴포넌트 테스트", () => {
  const renderWithClient = () => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <WorkbookButton />
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
          push: mockRouterPush,
        })),
        useSearchParams: vi.fn(() => ({
          get: vi.fn().mockReturnValueOnce(() => "1"),
        })),
      };
    });

    vi.mock("@common/hooks/useSusbscribeWorkbook", () => ({
      default: () => ({
        postSubscribeWorkbook: mockPostSubscribeWorkbook,
      }),
    }));
  });

  beforeEach(() => {
    mockRouterPush.mockClear();
    mockPostSubscribeWorkbook.mockClear();
    
    vi.resetModules();
  });

//   it("로그인한 사용자의 경우 구독 버튼이 렌더링되어야 한다", async () => {
//     vi.doMock("@shared/hooks/useIsLogin", () => ({
//       default: () => true,
//     }));

//     renderWithClient();

//     await waitFor(() => {
//         expect(screen.getByText(WORKBOOK_BTNS.SUB)).toBeInTheDocument();
//     })
//   });

  it("로그인하지 않은 사용자의 경우 로그인 및 구독 버튼이 렌더링되어야 한다", async () => {
    vi.doMock("@shared/hooks/useIsLogin", () => ({
      default: () => false,
    }));

    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText(WORKBOOK_BTNS.LOGIN_AND_SUB)).toBeInTheDocument();
    });
  });

//   it("로그인한 사용자가 구독 버튼을 클릭하면 postSubscribeWorkbook이 호출되고 쿼리가 다시 패치되어야 한다", async () => {
//     vi.doMock("@shared/hooks/useIsLogin", () => ({
//       default: () => true,
//     }));

//     renderWithClient();

//     const user = userEvent.setup();
//     const subscribeButton = screen.getByText(WORKBOOK_BTNS.SUB);
//     await user.click(subscribeButton);

//     await waitFor(() => {
//       expect(mockPostSubscribeWorkbook).toHaveBeenCalledWith({
//         workbookId: "1",
//         handleSucess: expect.any(Function),
//       });

//       const handleSuccess =
//         mockPostSubscribeWorkbook.mock.calls[0][0].handleSucess;
//       handleSuccess();

//       expect(queryClient.refetchQueries).toHaveBeenCalledWith({
//         queryKey: ["GET_SUBSCRIBE_WORKBOOKS"],
//       });
//       expect(queryClient.refetchQueries).toHaveBeenCalledWith({
//         queryKey: ["GET_WORKBOOKS_WITH_CATEGORY"],
//       });
//     });
//   });

  it("로그인하지 않은 사용자가 로그인 및 구독 버튼을 클릭하면 인증 페이지로 리다이렉트 되어야 한다", async () => {
    vi.doMock("@shared/hooks/useIsLogin", () => ({
      default: () => false,
    }));

    renderWithClient();

    const user = userEvent.setup();
    const loginAndSubscribeButton = screen.getByText(
      WORKBOOK_BTNS.LOGIN_AND_SUB,
    );

    await user.click(loginAndSubscribeButton);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/auth");
    });
  });
});
