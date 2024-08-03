export interface DropdownMenuItem {
  title: string;
  component: ({ title }: { title: string }) => JSX.Element;
}
