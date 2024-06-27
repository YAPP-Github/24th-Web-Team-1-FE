import React, { ReactNode } from "react";

import TopBar from "@common/components/TopBar";

interface UnsubscribeLayoutProps {
  children: ReactNode;
}
export default function UnsubscribeLayout({ children }: UnsubscribeLayoutProps) {
  return (
    <section className="mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar />
      {children}
    </section>
  );
}