import React, { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import { Switch } from "@shared/components/ui/switch";
import { cn } from "@shared/utils/cn";

import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";

import { subscribeWorkbookQueryOptions } from "@subscription/remotes/postSubscriptionQueryOptions";
import { postUnsubscriptionWorkbookMutationOptions } from "@subscription/remotes/postUnsubscriptionWorkbookMutationOptions";

import { SubscriptionManagementClientInfo } from "@main/types/workbook";

import SubscriptionManagementDayInfo from "../SubscriptionManagementDayInfo";

interface SubscriptionManagementItemProps
  extends SubscriptionManagementClientInfo {
  className: HTMLDivElement["className"];
}
export default function SubscriptionManagementItem({
  workbookId,
  isSubscription,
  dayInfo,
  className,
}: SubscriptionManagementItemProps) {
  const [isToggleSubscription, setIsToggleSubscription] =
    useState(isSubscription);

  const { data: workbookTitle } = useQuery({
    ...getWorkbookQueryOptions({
      workbookId,
      isWebpBrowser: true,
    }),
    select: ({ data }) => {
      return data.data.title;
    },
  });
  const { mutate: unsubscriptionWorkbook } = useMutation({
    ...postUnsubscriptionWorkbookMutationOptions(),
  });
  const { mutate: subscriptionWorkbook } = useMutation({
    ...subscribeWorkbookQueryOptions(),
  });

  const onClickToggleSubscription = () => {
    setIsToggleSubscription((prev) => !prev);
    if (isToggleSubscription) {
      unsubscriptionWorkbook({ workbookId });
    } else {
      subscriptionWorkbook({ workbookId });
    }
  };

  return (
    <article className={cn("flex items-center justify-between", className)}>
      <SubscriptionManagementDayInfo
        dayInfo={dayInfo}
        workbookTitle={workbookTitle}
      />
      <Switch
        className={cn(
          "data-[state=checked]:bg-main data-[state=unchecked]:bg-text-gray2",
          "h-[32px] w-[52px]",
          "[&>span]:h-[22px] [&>span]:w-[22px]",
        )}
        checked={isToggleSubscription}
        onClick={onClickToggleSubscription}
      />
    </article>
  );
}
