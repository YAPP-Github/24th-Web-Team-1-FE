import LottieClient from "@shared/components/Lottie";
import { Button } from "@shared/components/ui/button";

import { SIGNUP_COMPLETED } from "@auth/constants/auth";
import lottieJson from "public/assets/Problem_Complete.json";
import Logo from "public/enterlogo.svg";

export default function SignupComplete() {
  return (
    <div className="flex h-auto flex-col items-center">
      <LottieClient animationData={lottieJson} /> 
      <Logo />
      <span className="h3-bold mb-[20px] mt-[63px] text-black">
        {SIGNUP_COMPLETED.GRETTING}
      </span>
      <span className="sub3-semibold text-text-gray5 mb-[123px]">
        {SIGNUP_COMPLETED.INTRO}
      </span>
      <Button className="h-[56px] w-full rounded-none bg-main py-6 text-white">
        {SIGNUP_COMPLETED.MAIN_BUTTON}
      </Button>
    </div>
  );
}
