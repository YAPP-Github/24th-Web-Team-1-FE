"use client";
import TopBar from "@common/components/TopBar";
import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import { useRouter } from "next/navigation";

export default function ProblemTopbar() {
  const { prevSetProblemId } = useProblemIdsViewModel();
  const { back } = useRouter();

  const handleBackClick = () => {
    prevSetProblemId();
    back();
  };

  return <TopBar onClick={handleBackClick} />;
}
