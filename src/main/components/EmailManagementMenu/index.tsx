import React from "react";

import { useQuery } from "@tanstack/react-query";

import { SubscriptionManagementModel } from "@main/models/SubscriptionManagementModel";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";

import EmailDayManagementDialog from "../EmailDayManagementDialog";
import EmailTimeManagementDialog from "../EmailTimeManagementDialog";

export default function SubscriptionEmailManagement() {
  const { data } = useQuery({
    ...getSubscriptionWorkbooksQueryOptions({ pageType: "myPage" }),
    select: ({ data }) => {
      const subscriptionManagementModel = new SubscriptionManagementModel({
        initSubscriptionManagementServerList: data.data.workbooks,
      });
      return subscriptionManagementModel.SubscriptionEmailManagementClientInfo;
    },
  });

  return (
    <section className="flex flex-col">
      {data && (
        <>
          <article className="flex h-[66px] items-center justify-between py-[10px]">
            <p className="sub2-medium">이메일 받는 시간</p>
            <EmailTimeManagementDialog {...data} />
          </article>
          <article className="flex h-[66px] items-center justify-between py-[10px]">
            <p className="sub2-medium">이메일 받는 요일</p>
            <EmailDayManagementDialog {...data} />
          </article>
        </>
      )}
    </section>
  );
}
