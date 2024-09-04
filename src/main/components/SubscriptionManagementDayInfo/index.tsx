import React from "react";

import { SubscriptionManagementClientInfo } from "@main/types/workbook";

interface SubscriptionManagementDayInfoProps
  extends Pick<SubscriptionManagementClientInfo, "dayInfo"> {
  workbookTitle: string | undefined;
}
export default function SubscriptionManagementDayInfo({
  dayInfo: { totalDay, currentDay },
  workbookTitle,
}: SubscriptionManagementDayInfoProps) {
  return (
    <div>
      <p className="text-[13px] font-semibold">
        <span className="text-text-main">Day{currentDay}</span>/
        <span className="text-text-gray2">{totalDay}</span>
      </p>
      <p className="body3-medium max-w-[280px] truncate text-text-gray1">
        {workbookTitle}
      </p>
    </div>
  );
}
