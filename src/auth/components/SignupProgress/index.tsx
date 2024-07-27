import { cn } from "@shared/utils/cn";

import { DESCRIPTION_STYLE, SIGNUP_PROGRESS } from "@auth/constants/auth";

const signupProgressMessages = [
  SIGNUP_PROGRESS.EMAIL_SENT_EMAIL,
  SIGNUP_PROGRESS.EMAIL_SENT_LINK,
];

export default function SignupProgress() {
  return (
    <section className="flex flex-col items-center gap-y-[83px]">
      <div className="flex flex-col items-center gap-y-[10px]">
        <div className="flex flex-col items-center">
          {signupProgressMessages.map((message, index) => (
            <h3 key={`${message}-${index}`} className="h3-bold">
              {message}
            </h3>
          ))}
        </div>
        <span className="body3-medium text-text-gray1">
          {SIGNUP_PROGRESS.COMPLETE_MESSAGE}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col gap-y-[4px]",
          "rounded-[4px] bg-background1",
          "w-full items-start p-[15px]",
        )}
      >
        <span className={`text-main ${DESCRIPTION_STYLE}`}>
          {SIGNUP_PROGRESS.NOT_SENT_INFO_TITLE}
        </span>
        <span className={`text-text-gray1 ${DESCRIPTION_STYLE}`}>
          {SIGNUP_PROGRESS.NOT_SENT_INFO_SPAM_CHECK}
        </span>
        <span className={`text-text-gray1 ${DESCRIPTION_STYLE}`}>
          {SIGNUP_PROGRESS.NOT_SENT_INFO_CHECK}
        </span>
      </div>
    </section>
  );
}
