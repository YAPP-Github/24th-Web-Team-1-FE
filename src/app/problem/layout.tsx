import { ProblemProvider } from "@problem/context/problemContext";
import { ReactNode } from "react";

interface ProblemLayoutProps {
  children: ReactNode;
}
export default function ProblemLayout({ children }: ProblemLayoutProps) {
  return (
    <main className="flex h-auto w-full">
      <ProblemProvider>
        <div>{children}</div>
      </ProblemProvider>
    </main>
  );
}
