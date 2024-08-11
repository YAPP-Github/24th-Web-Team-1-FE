"use client"

import { useRouter, useSearchParams } from "next/navigation";

import LottieClient from "@shared/components/Lottie";
import { Button } from "@shared/components/ui/button";

import { SIGNUP_COMPLETED } from "@auth/constants/auth";
import { useAuth } from "@auth/hooks/useAuth";
import lottieJson from "public/assets/Problem_Complete.json";
import FewLogo from "public/enterlogo.svg";

export default function ValidationCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const auth_token = searchParams.get("auth_token");
  // useAuth(auth_token? auth_token : "");
  
  return (
    <div className="flex h-auto flex-col items-center">
      <LottieClient animationData={lottieJson} /> 
      <FewLogo />
      <span className="h3-bold mb-[20px] mt-[63px] text-black">
        {SIGNUP_COMPLETED.GRETTING}
      </span>
      <span className="sub3-semibold text-text-gray5 mb-[123px]">
        {SIGNUP_COMPLETED.INTRO}
      </span>
      <Button className="h-[56px] w-full rounded-none bg-main py-6 text-white cursor-pointer" onClick={() => router.push('/')}>
        {SIGNUP_COMPLETED.MAIN_BUTTON}
      </Button>
    </div>
  );
}
