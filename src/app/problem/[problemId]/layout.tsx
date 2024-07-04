import AnswerSubmitButton from "@problem/components/AnswerSubmitButton";
import ProblemCompleteDialog from "@problem/components/ProblemCompleteDialog";
import ProblemTopbar from "@problem/components/ProblemTopbar";
import { ProblemProvider } from "@problem/context/problemContext";
import { ReactNode } from "react";

interface ProblemLayoutProps {
  children: ReactNode;
}
export default function ProblemLayout({ children }: ProblemLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <ProblemProvider>
        <section className="relative mx-[20px] mb-[10px] flex h-auto w-full max-w-[480px] flex-col justify-between">
          <div className="mb-[20px] flex flex-col">
            <ProblemTopbar />
            {children}
          </div>
          <AnswerSubmitButton />
          <ProblemCompleteDialog />
        </section>
      </ProblemProvider>
    </div>
  );
}
