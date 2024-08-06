export interface DropdownMenuItem {
  title: string;
  component: ({
    title,
    email,
  }: {
    title: string;
    email?: string;
  }) => JSX.Element;
}
