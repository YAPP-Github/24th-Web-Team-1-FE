"use client"
import { ChangeEvent, useEffect, useState } from "react";

import SubscribePopup from "@main/components/SubscribePopup";
import { EMAIL_PLACEHOLDER, SUBSCRIBE_ACCEPT, SUBSCRIBE_ANNOUNCE_1, SUBSCRIBE_ANNOUNCE_2, SUBSCRIBE_ANNOUNCE_3, SUBSCRIBE_ANNOUNCE_4, SUBSCRIBE_REJECT, SUBSCRIBE_TITLE_1, SUBSCRIBE_TITLE_2 } from "@main/constants/main";
import { Input } from "@shared/components/ui/input";
import SubscribeButton from "@main/components/SubscribeButton";
import Link from "next/link";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black font-bold text-lg leading-[27px]">
    <div>{SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }


  return (
    <main className="flex h-[100dvh] w-full flex-col items-center overflow-hidden">
      {
        isClient && (
          <SubscribePopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={SUBSCRIBE_POPUP_TITLE}
            content={
              <div className="flex flex-col space-y-[11px]">
                <Input type="email" placeholder={EMAIL_PLACEHOLDER} value={email} onChange={handleEmailChange} />
                <span className="text-[12px] font-semibold text-text-gray2">
                  {SUBSCRIBE_ANNOUNCE_1} <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUNCE_2}</a>과 <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUNCE_3}</a>에 {SUBSCRIBE_ANNOUNCE_4}
                </span>
              </div>
            }
            footer={
              <div className="flex flex-row w-full space-x-[8px]">
                <SubscribeButton label={SUBSCRIBE_REJECT} handleClick={() => setIsOpen(false)} variant={"outline"} className={"bg-white text-black font-medium text-[14px] w-1/2"} />
                <SubscribeButton label={SUBSCRIBE_ACCEPT} handleClick={() => setIsOpen(false)} variant={"outline"} className={"bg-black text-white font-medium text-[14px] w-1/2"} />
              </div>
            }
          />
        )
      }
    </main>
  );
}
