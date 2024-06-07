import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import withAppRouterContext from "./withAppRouterContext";
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
};

export default preview;
