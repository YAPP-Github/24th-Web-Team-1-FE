import React, { ReactNode } from "react";

import TopBar from "@common/components/TopBar";

interface ProblemLayoutProps {
  children: ReactNode;
}
export default function ProblemLayout({ children }: ProblemLayoutProps) {
  return (
    <section className="relative mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar />
      {children}
    </section>
  );
}
