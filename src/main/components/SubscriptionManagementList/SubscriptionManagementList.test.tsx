import QueryClientProviders from "@shared/components/queryClientProvider";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { createQueryProviderWrapper } from "@shared/constants/createQueryProvider";
import userEvent from "@testing-library/user-event";
import SubscriptionManagementList from ".";
import { postUnsubscriptionWorkbookMutationOptions } from "@subscription/remotes/postUnsubscriptionWorkbookMutationOptions";

describe("워크북 구독 리스트 관리 컴포넌트 테스트", () => {
  const renderWithClient = () => {
    return render(
      <QueryClientProviders>
        <SubscriptionManagementList />
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

  it("심리스한 워크북 구독 테스트", async () => {
    const { result: unsubscriptionresult } = renderHook(
      () =>
        useMutation({
          ...postUnsubscriptionWorkbookMutationOptions(),
        }),
      { wrapper: createQueryProviderWrapper() },
    );
    screen.debug();

    const user = userEvent.setup();
    const workbookToggleButton = screen.getByTestId("switch-2");
    expect(workbookToggleButton).toHaveValue("on");

    await user.click(workbookToggleButton);

    unsubscriptionresult.current.mutate({ workbookId: "2" });
    await waitFor(() =>
      expect(unsubscriptionresult.current.isSuccess).toBeTruthy(),
    );
  });
});
