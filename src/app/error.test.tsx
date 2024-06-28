import { http,HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { apiRoutes } from "@shared/constants/apiRoutes";

import Error from "./error";
import { render, screen, waitFor } from "@testing-library/react";

// 네트워크 에러를 반환하는 핸들러 설정
const server = setupServer(
  http.get(apiRoutes.problems, async () => {
    return HttpResponse.json("Service Unavaliable", { status: 404 });
  }),
);

// 테스트 실행 전 서버를 시작
beforeAll(() => server.listen());
// 각 테스트 후 서버 핸들러를 리셋
afterEach(() => server.resetHandlers());
// 모든 테스트 후 서버를 종료
afterAll(() => server.close());


describe("Error component", () => {
  it("네트워크 에러 페이지 렌더링", async () => {
    const error = { statusCode: 503 };
    render(<Error error={error} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        screen.getByText(
          "네트워크 연결에 실패했어요. 확인 후 다시 시도해주세요.",
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("다시 시도하기")).toBeInTheDocument();
    });
  });

  it("renders general error message", () => {
    const error = { statusCode: 400, message: "Bad Request" };
    render(<Error error={error} />);

    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
    expect(screen.getByText("Bad Request")).toBeInTheDocument();
  });

  it("renders default error message", () => {
    const error = { statusCode: 400 };
    render(<Error error={error} />);

    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
    expect(screen.getByText("잠시 후 다시 시도해 주세요.")).toBeInTheDocument();
  });
});
