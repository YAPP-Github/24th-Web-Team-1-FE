import { notFound as mockNotFound } from "next/navigation";

import { beforeAll, describe, expect, it, vi } from "vitest";

import NotFoundCatchAll from "./[...not_found]/page";
import NotFound from "./not-found";
import { GO_TO_MAIN, NOT_FOUND_WORDS } from "@common/constants/notFound";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

// next/navigation의 notFound 함수를 목킹(mocking)
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  useRouter: vi.fn()
}));

describe("Custom 404 Page 테스트", () => {
  it("404 에러 페이지 렌더링 시, 커스텀 404 에러 페이지가 렌더링 된다.", () => {
    // NotFound 컴포넌트를 렌더링
    render(<NotFound />);

    // 각 요소가 DOM에 존재하는지 확인
    expect(screen.getByTestId('not-found-logo')).toBeInTheDocument();
    expect(screen.getByText(NOT_FOUND_WORDS.TITLE)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: GO_TO_MAIN }),
    ).toBeInTheDocument();
  });

  it("없는 경로에 진입 시 커스텀 404 에러 페이지를 렌더링한다.", () => {
    // NotFoundCatchAll 컴포넌트를 렌더링
    render(<NotFoundCatchAll />);

    // 목킹된 notFound 함수가 호출되었는지 확인
    expect(mockNotFound).toHaveBeenCalled();
  });
});
