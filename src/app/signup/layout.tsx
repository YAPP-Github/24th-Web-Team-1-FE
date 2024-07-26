import { ReactNode } from "react";

import TopBar from "@shared/components/TopBar";

interface SignupLayoutProps {
  children: ReactNode;
}
export default function SignupLayout({ children }: SignupLayoutProps) {
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
