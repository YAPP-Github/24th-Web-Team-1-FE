import { useMutation, useQuery } from "@tanstack/react-query";

import { beforeEach, describe, expect, it } from "vitest";

import QueryClientProviders from "@shared/components/queryClientProvider";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";

import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { patchWorkbookEmailDayMutationOptions } from "@main/remotes/patchWorkbookEmailDayMutationOptions";
import { patchWorkbookEmailTimeMutationOptions } from "@main/remotes/patchWorkbookEmailTimeMutationOptions";

import SubscriptionEmailManagement from ".";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("이메일 관련 구독 관리 컴포넌트 테스트", () => {
  const renderWithClient = () => {
    return render(
      <QueryClientProviders>
        <SubscriptionEmailManagement />
      </QueryClientProviders>,
    );
  };

  beforeEach(async () => {
    renderWithClient();
    const { result } = renderHook(
      () =>
        useQuery({
          ...getSubscriptionWorkbooksQueryOptions(),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    await waitFor(async () => result.current.isLoading);
    await waitFor(async () => result.current.isSuccess);
  });

  it("이메일 시간 변경하기 테스트", async () => {
    const { result } = renderHook(
      () =>
        useMutation({
          ...patchWorkbookEmailTimeMutationOptions(),
        }),
      { wrapper: createQueryProviderWrapper() },
    );

    const user = userEvent.setup();
    const emialTimeButton = screen.getByRole("button", { name: "오전 9시" });

    await user.click(emialTimeButton);
    const popupHeading = screen.getByRole("heading", {
      level: 2,
    });

    expect(popupHeading).toHaveTextContent("아침에 이메일을 받고 싶은 시간을");

    const tenTimeButton = screen.getByRole("button", { name: "10시" });
    await user.click(tenTimeButton);

    const closeButton = screen.getByRole("button", { name: "완료" });
    await user.click(closeButton);

    result.current.mutate({ time: "10:00" });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(screen.getByRole("button", { name: "오전 10시" }));
  });

  it("이메일 요일 변경하기 테스트", async () => {
    const { result } = renderHook(
      () =>
        useMutation({
          ...patchWorkbookEmailDayMutationOptions(),
        }),
      { wrapper: createQueryProviderWrapper() },
    );

    const user = userEvent.setup();
    const emialDayButton = screen.getByRole("button", {
      name: "매일 받을래요",
    });

    await user.click(emialDayButton);
    const popupHeading = screen.getByRole("heading", {
      level: 2,
    });

    expect(popupHeading).toHaveTextContent("이메일을 받고 싶은 요일을");

    const notWeekButton = screen.getByRole("button", {
      name: "주말에는 안 받을래요",
    });
    await user.click(notWeekButton);

    const closeButton = screen.getByRole("button", { name: "완료" });
    await user.click(closeButton);

    result.current.mutate({ date: "0011111" });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(screen.getByRole("button", { name: "주말에는 안 받을래요" }));
  });
});
