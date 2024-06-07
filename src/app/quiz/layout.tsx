import React, { ReactNode } from "react";

import TopBar from "@common/components/TopBar";

interface Props {
  children: ReactNode;
}
export default function QuizLayout({ children }: Props) {
  return (
    <section className="mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar />
      {children}
    </section>
  );
}
