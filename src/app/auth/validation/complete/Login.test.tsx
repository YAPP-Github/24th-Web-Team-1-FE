import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import ValidationCompletePage from "./page";
import { SIGNUP_COMPLETED } from "@auth/constants/auth";
import { render, screen,waitFor } from "@testing-library/react";

// Mocking useRouter
const mockPush = vi.fn();

describe("ValidationCompletePage Component", () => {
  const queryClient = new QueryClient();

  const renderWithClient = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ValidationCompletePage />
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
        useSearchParams: vi.fn(() => ({
          get: vi.fn().mockReturnValueOnce(() => "test-token"),
        })),
        useRouter: vi.fn(() => ({
          mockPush,
        })),
      };
    });
  })

  beforeEach(() => {
    renderWithClient();
  });

  it("should authenticate and set cookies correctly", async () => {
    await waitFor(() => {
      expect(document.cookie).toContain("accessToken=accessToken");
      expect(document.cookie).toContain("refreshToken=refreshToken");
    });
  });

  it("should render the correct components", () => {
    expect(screen.getByText(SIGNUP_COMPLETED.GRETTING)).toBeInTheDocument();
    expect(screen.getByText(SIGNUP_COMPLETED.INTRO)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: SIGNUP_COMPLETED.MAIN_BUTTON }),
    ).toBeInTheDocument();
  });
});
