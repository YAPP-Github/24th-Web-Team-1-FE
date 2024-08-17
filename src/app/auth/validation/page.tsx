"use client";
import { useSearchParams } from "next/navigation";

import SignupPending from "@auth/components/SignupPending";
import SignupProgress from "@auth/components/SignupProgress";
import { QUERY_KEY } from "@auth/remotes/api";
import { useMutationState } from "@tanstack/react-query";
import FewLogo from "public/enterlogo.svg";

export default function ValidationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const emailMutationState = useMutationState({
    filters: { mutationKey: [QUERY_KEY.MEMBERS] },
    select: (mutation) => {
      return {
        status: mutation.state.status,
      };
    },
  });
  const lastPendingIndex = emailMutationState.length - 1;
  const isPending = emailMutationState[lastPendingIndex]?.status === "pending";
  return (
    <div className="flex h-full flex-col items-center">
      <FewLogo />
      <span className="h3-bold mb-[20px] mt-[63px] text-text-gray1">
        {email}
      </span>
      {!isPending ? <SignupProgress /> : <SignupPending />}
    </div>
  );
}
