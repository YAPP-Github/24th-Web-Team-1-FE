import { afterAll, afterEach, beforeAll, vi } from "vitest";
import "vitest-canvas-mock";
import "@testing-library/jest-dom";
import { server } from "@mocks/server";
import { cleanup } from "@testing-library/react";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
  vi.resetAllMocks();
});
