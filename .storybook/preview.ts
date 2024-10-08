import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/app/globals.css";
import { worker } from "../src/mocks/worker";
import { handlers } from "./../src/mocks/handlers";
import withAppRouterContext from "./withAppRouterContext";

initialize({
  onUnhandledRequest: "bypass",
});

if (typeof global.process === "undefined") {
  worker.start();
}
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        ...handlers,
      },
    },
  },
  decorators: [withAppRouterContext],
  loaders: [mswLoader],
};

export default preview;
