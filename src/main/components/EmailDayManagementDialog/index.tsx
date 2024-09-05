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
import { patchWorkbookEmailDayMutationOptions } from "@main/remotes/patchWorkbookEmailDayMutationOptions";
import { SubscriptionEmailClientInfo } from "@main/types/emailInfo";

export default function EmailDayManagementDialog({
  day,
}: Pick<SubscriptionEmailClientInfo, "day">) {
  const [currentDay, setCurrentDay] = useState(day);
  useModalWidthControl();

  const { mutate: patchWorkbookEmailDay } = useMutation({
    ...patchWorkbookEmailDayMutationOptions(),
  });

  const onClickUpdateWorkbookEmailDay = () => {
    patchWorkbookEmailDay({
      date: SubscriptionManagementModel.getDayPostInfo({ day: currentDay }),
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="sub2-medium rounded-lg bg-text-gray3 px-2 py-1">
        {SUBSCRIPTION_EMAIL_CLIENT_INFO.DAY[currentDay]}
      </DialogTrigger>
      <DialogContent className="z-50 w-full max-w-[380px] rounded bg-white">
        <DialogHeader>
          <DialogTitle className="h3-bold mb-[35px]">
            이메일을 받고 싶은 요일을
            <br /> 선택해주세요.
          </DialogTitle>
          <DialogDescription className="flex justify-between">
            {Object.keys(SUBSCRIPTION_EMAIL_CLIENT_INFO.DAY).map((key) => {
              const currentKey =
                key as keyof typeof SUBSCRIPTION_EMAIL_CLIENT_INFO.DAY;
              const value = SUBSCRIPTION_EMAIL_CLIENT_INFO.DAY[currentKey];
              return (
                <Button
                  className={cn(
                    "body3-medium bg-white text-text-gray2",
                    "min-w-[150px] p-[12px]",
                    "rounded-[10px] border-[1px] border-text-gray2",
                    "hover:bg-main hover:text-white",
                    key === currentDay && "bg-main text-white",
                  )}
                  key={`email-day-${key}`}
                  onClick={() => setCurrentDay(currentKey)}
                >
                  {value}
                </Button>
              );
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            className="body3-medium mt-[34px] bg-black py-[12px] text-white"
            onClick={onClickUpdateWorkbookEmailDay}
          >
            완료
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
