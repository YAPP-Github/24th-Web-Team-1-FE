import AnswerSubmitButton from "@problem/components/AnswerSubmitButton";
import ProblemCompleteDialog from "@problem/components/ProblemCompleteDialog";
import ProblemTopbar from "@problem/components/ProblemTopbar";
import { ProblemProvider } from "@problem/context/problemContext";
import React, { ReactNode } from "react";

interface ProblemLayoutProps {
  children: ReactNode;
}
export default function ProblemLayout({ children }: ProblemLayoutProps) {
  return (
    <main className="flex h-auto w-full">
      <ProblemProvider>
        <section className="relative mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
          <div className="flex flex-col">
            <ProblemTopbar />
            {children}
          </div>
          <AnswerSubmitButton />
          <ProblemCompleteDialog />
        </section>
      </ProblemProvider>
    </main>
  );
}
