import { HTMLAttributes } from "react";

import { WorkbookServerInfo } from "@workbook/types";

import { SubscriptionEmailServerInfo } from "./emailInfo";

type SubscriptionStatus = "ACTIVE" | "DONE";

export interface WorkbookSubscriptionServerInfo
  extends Pick<WorkbookServerInfo, "id"> {
  status: SubscriptionStatus;
  totalDay: number;
  currentDay: number;
  rank: number;
  totalSubscriber: number;
  articleInfo: string; // JSON문자열
  subscription: SubscriptionEmailServerInfo;
  workbookInfo?: string; // JSON 문자열
}

export type SubscriptionManagementClientInfo = {
  workbookTitle: string;
  workbookId: string;
  isSubscription: boolean;
  dayInfo: {
    totalDay: WorkbookSubscriptionServerInfo["totalDay"];
    currentDay: WorkbookSubscriptionServerInfo["currentDay"];
  };
};
export type WorkbookCardServerInfo = {
  subscriberCount: number;
} & Omit<WorkbookServerInfo, "articles" | "name">;

export interface WorkbookCardClientInfo {
  id: number;
  mainImageUrl: string;
  isPriorityImage: boolean;
  metaComponent: React.ReactElement;
  title: string;
  writers: string[];
  personCourse: string;
  buttonTitle: string;
  badgeInfo: HTMLAttributes<HTMLDivElement>;
  cardType: "LEARN" | "SUBSCRIBE" | "SHARE";
  articleId: string | null;
}

export type WorkbookServerInfoListRes<T> = {
  workbooks: T[];
};
