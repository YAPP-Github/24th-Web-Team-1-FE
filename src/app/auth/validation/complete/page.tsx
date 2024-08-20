"use client";

import { useRouter, useSearchParams } from "next/navigation";

import LottieClient from "@shared/components/Lottie";
import { Button } from "@shared/components/ui/button";

import useIsLogin from "@shared/hooks/useIsLogin";

import { SIGNUP_COMPLETED } from "@auth/constants/auth";
import lottieJson from "public/assets/Problem_Complete.json";
import FewLogo from "public/enterlogo.svg";
import { Mixpanel } from "@shared/utils/mixpanel";
export default function ValidationCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberEmail = searchParams.get("member_email");

  const isLogin = useIsLogin();

  return (
    <div className="flex h-auto flex-col items-center">
      <LottieClient animationData={lottieJson} />
      <FewLogo />
      <span className="h3-bold mb-[20px] mt-[63px] text-black">
        {SIGNUP_COMPLETED.GRETTING}
      </span>
      <span className="sub3-semibold mb-[123px] text-text-gray5">
        {SIGNUP_COMPLETED.INTRO}
      </span>
      <Button
        className="h-[56px] w-full cursor-pointer rounded-none bg-main py-6 text-white"
        onClick={() => {
          if (memberEmail && isLogin) {
            Mixpanel.identify({ id: memberEmail });
            Mixpanel.people.set({ peoples: { $email: memberEmail } });
          }

          router.push("/");
        }}
      >
        {SIGNUP_COMPLETED.MAIN_BUTTON}
      </Button>
    </div>
  );
}
