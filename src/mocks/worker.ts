import { RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export const implementWorker = (restHandlers: RequestHandler[]) => {
  worker.use(...restHandlers);
};

export const resetWorker = (restHandlers: RequestHandler[]) => {
  worker.resetHandlers(...restHandlers);
};
