"use client";
import { useSearchParams } from "next/navigation";

import SignupProgress from "@auth/components/SignupProgress";
import FewLogo from "public/enterlogo.svg";

export default function ValidationPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  return (
    <div className="flex h-full flex-col items-center">
      <FewLogo />
      <span className="h3-bold mb-[20px] mt-[63px] text-text-gray1">
        {email}
      </span>
      <SignupProgress />
    </div>
  );
}
