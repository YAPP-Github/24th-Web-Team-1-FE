import { SIGNUP_PROGRESS } from "@auth/constants/auth";

export default function SignupProgress() {
  return (
    <section className="flex flex-col items-center gap-y-[83px]">
      <div className="flex flex-col items-center gap-y-[10px]">
        <div className="flex flex-col items-center">
          <h3 className="h3-bold">{SIGNUP_PROGRESS.EMAIL_SENT_1}</h3>
          <h3 className="h3-bold">{SIGNUP_PROGRESS.EMAIL_SENT_2}</h3>
        </div>
        <span className="body3-medium text-text-gray1">{SIGNUP_PROGRESS.COMPLETE_MESSAGE}</span>
      </div>
      <div className="bg-background1 rounded-[4px] flex flex-col gap-y-[4px] items-start p-[15px] w-full">
        <span className="text-main text-[12px] font-bold">{SIGNUP_PROGRESS.NOT_SENT_INFO_TITLE}</span>
        <span className="text-text-gray1 text-[12px] font-bold">{SIGNUP_PROGRESS.NOT_SENT_INFO_1}</span>
        <span className="text-text-gray1 text-[12px] font-bold">{SIGNUP_PROGRESS.NOT_SENT_INFO_2}</span>
      </div>
    </section>
  );
}
