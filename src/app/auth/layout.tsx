import React, { ReactNode } from "react";

import TopBar from "@common/components/TopBar";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="flex h-auto w-full">
      <section className="flex h-auto w-full flex-col justify-between">
        <div className="mx-[20px] mb-[10px] flex flex-col">
          <TopBar />
          {children}
        </div>
      </section>
    </main>
  );
}

