import { ReactNode } from "react";

import TopBar from "@shared/components/TopBar";

interface CancelLayoutProps {
  children: ReactNode;
}
export default function CancelLayout({ children }: CancelLayoutProps) {
  return (
    <section className="mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar />
      {children}
    </section>
  );
}
