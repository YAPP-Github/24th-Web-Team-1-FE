"use client";
import TopBar from "@shared/components/TopBar";
import { useProblemIdsViewModel } from "@shared/models/useProblemIdsViewModel";
import { useRouter } from "next/navigation";

export default function ProblemTopbar() {
  const { prevSetProblemId } = useProblemIdsViewModel();
  const { back } = useRouter();

  const handleBackClick = () => {
    prevSetProblemId();
    back();
  };

  return <TopBar onClick={handleBackClick} className="z-[50]" />;
}
