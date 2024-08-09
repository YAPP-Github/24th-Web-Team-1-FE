import LottieClient from "@shared/components/Lottie";

import { SIGNUP_PENDING } from "@auth/constants/auth";
import lottieJson from "public/assets/loading_bar.json";


const signupPendingMessages = [
    SIGNUP_PENDING.EMAIL_TYPED,
    SIGNUP_PENDING.EMAIL_SENDING,
]

export default function SignupPending() {
  return (
    <section className="flex flex-col items-center gap-y-[26px]">
      <div className="flex flex-col items-center">
          {signupPendingMessages.map((message, index) => (
            <h3 key={`${message}-${index}`} className="h3-bold">
              {message}
            </h3>
          ))}
        </div>
      <div>
        <LottieClient animationData={lottieJson} />
      </div>
      <div>
        <span className="sub3-semibold text-text-gray1">{SIGNUP_PENDING.EMAIL_PENDING_TIME}</span>
      </div>
    </section>
  );
}
