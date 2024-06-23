import ProblemTopbar from "@problem/components/ProblemTopbar";
import React, { ReactNode } from "react";

interface ProblemLayoutProps {
  children: ReactNode;
}
export default function ProblemLayout({ children }: ProblemLayoutProps) {
  return (
    <section className="relative mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <ProblemTopbar />
      {children}
    </section>
  );
}
