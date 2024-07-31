import QueryClientProviders from "@shared/components/queryClientProvider";
import { Meta, StoryObj } from "@storybook/react";
import CategoryTabs from ".";

const meta = {
  decorators: [
    (Story) => (
      <QueryClientProviders>
        <Story />
      </QueryClientProviders>
    ),
  ],
  component: CategoryTabs,
} satisfies Meta<typeof CategoryTabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "WORKBOOK" as const,
    category: "Category 1",
    handleCategory: (category: string) => console.log(),
  },
} satisfies Story;
