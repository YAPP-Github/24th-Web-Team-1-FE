import { describe, expect, it } from "vitest";

import {
  defaultActions,
  defaultState,
  renderWithContext,
} from "./QuizTitle.test";
import { screen, waitFor } from "@testing-library/react";

describe("퀴즈 정보 불러오기 테스트", () => {
  it("퀴즈 불러와서 페이지에 보이는지 확인", async () => {
    renderWithContext({
      ...defaultActions,
      states: { ...defaultState.states, isSubmit: false },
    });

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 3 });
      if (QUIZ_TITLE_INFO.NO_ANSWER.title)
        expect(heading).toHaveTextContent(QUIZ_TITLE_INFO.NO_ANSWER.title);
      if (QUIZ_TITLE_INFO.NO_ANSWER.className)
        expect(heading).toHaveClass(QUIZ_TITLE_INFO.NO_ANSWER.className);
    });
  });
});
