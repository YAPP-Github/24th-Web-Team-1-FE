import { WorkbookInfo } from "@workbook/types";
import { HTMLAttributes } from "react";

type SubscriptionStatus = "ACTIVE" | "DONE";

export interface WorkbookSubscriptionInfo extends Pick<WorkbookInfo, "id"> {
  status: SubscriptionStatus;
  totalDay: number;
  currentDay: number;
  rank: number;
  totalSubscriber: number;
  articleInfo: string; // JSON문자열
}

export type WorkbookServerInfo = {
  subscriberCount: number;
} & Omit<WorkbookInfo, "articles" | "name">;

export interface WorkbookClientInfo {
  id: number;
  mainImageUrl: string;
  metaComponent: React.ReactElement;
  title: string;
  writers: string[];
  personCourse: string;
  buttonTitle: string;
  badgeInfo: HTMLAttributes<HTMLDivElement>;
  cardType: "LEARN" | "SUBSCRIBE" | "SHARE";
}

export type WorkbookServerInfoListRes<T> = {
  workbooks: T[];
};
