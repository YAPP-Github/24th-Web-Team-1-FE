import React from "react";

import { useQuery } from "@tanstack/react-query";

import { Separator } from "@shared/components/ui/separator";
import { cn } from "@shared/utils/cn";

import { SubscriptionManagementModel } from "@main/models/SubscriptionManagementModel";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";

import SubscriptionManagementItem from "../SubscriptionManagementItem";

export default function SubscriptionManagementList() {
  const { data } = useQuery({
    ...getSubscriptionWorkbooksQueryOptions(),
    select: ({ data }) => {
      const subscriptionManagementModel = new SubscriptionManagementModel({
        initSubscriptionManagementServerList: data.data.workbooks,
      });
      return subscriptionManagementModel.SubscriptionMangementClientList;
    },
  });

  return (
    <section className="relative flex flex-col">
      <Separator className="sperator h-[20px] w-auto bg-background1" />
      {data?.map((subscriptionInfo, idx) => (
        <SubscriptionManagementItem
          {...subscriptionInfo}
          key={`${subscriptionInfo.workbookId}-subscription-item-${idx}`}
          className={cn(
            "px-[20px] py-[21px]",
            data.length - 1 !== idx && "border-b-[0.5px] border-text-gray3",
          )}
        />
      ))}
    </section>
  );
}
