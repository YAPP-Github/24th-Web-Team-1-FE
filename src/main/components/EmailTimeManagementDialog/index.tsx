"use client";
import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/components/ui/dialog";
import useModalWidthControl from "@shared/hooks/useModalWidthControl";
import { cn } from "@shared/utils/cn";

import { SUBSCRIPTION_EMAIL_CLIENT_INFO } from "@main/constants/emailInfo";
import { SubscriptionManagementModel } from "@main/models/SubscriptionManagementModel";
import { putWorkbookEmailTimeMutationOptions } from "@main/remotes/putWorkbookEmailTimeMutationOptions";
import { SubscriptionEmailClientInfo } from "@main/types/emailInfo";

export default function EmailTimeManagementDialog({
  time,
}: Pick<SubscriptionEmailClientInfo, "time">) {
  const [currentTime, setCurrentTime] = useState(time);
  useModalWidthControl();

  const { mutate: putWorkbookEmailTime } = useMutation({
    ...putWorkbookEmailTimeMutationOptions(),
  });

  const onClickUpdateWorkbookEmailTime = () => {
    putWorkbookEmailTime({
      time: SubscriptionManagementModel.getTimePostInfo({ time: currentTime }),
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="sub2-medium rounded-lg bg-text-gray3 px-2 py-1">
        오전 {SUBSCRIPTION_EMAIL_CLIENT_INFO.TIME[currentTime]}시
      </DialogTrigger>
      <DialogContent className="z-50 w-full max-w-[380px] rounded bg-white">
        <DialogHeader>
          <DialogTitle className="h3-bold mb-[35px]">
            아침에 이메일을 받고 싶은 시간을
            <br /> 선택해주세요.
          </DialogTitle>
          <DialogDescription className="flex justify-between">
            {Object.keys(SUBSCRIPTION_EMAIL_CLIENT_INFO.TIME)
              .sort((a, b) => Number(a) - Number(b))
              .map((key) => {
                const currentKey =
                  key as keyof typeof SUBSCRIPTION_EMAIL_CLIENT_INFO.TIME;
                const value = SUBSCRIPTION_EMAIL_CLIENT_INFO.TIME[currentKey];
                return (
                  <Button
                    className={cn(
                      "body3-medium bg-white text-text-gray2",
                      "min-w-[52px] p-[12px]",
                      "rounded-[10px] border-[1px] border-text-gray2",
                      "hover:bg-main hover:text-white",
                      key === currentTime && "bg-main text-white",
                    )}
                    key={`email-time-${key}`}
                    onClick={() => setCurrentTime(currentKey)}
                  >
                    {value}시
                  </Button>
                );
              })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            className="body3-medium mt-[34px] bg-black py-[12px] text-white"
            onClick={onClickUpdateWorkbookEmailTime}
          >
            완료
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
