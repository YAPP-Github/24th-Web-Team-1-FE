import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import withAppRouterContext from "./withAppRouterContext";
import { worker } from "../src/mocks/worker";
import { initialize, mswLoader } from "msw-storybook-addon";

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
  },
  decorators: [withAppRouterContext],
  loaders: [mswLoader],
};

export default preview;
