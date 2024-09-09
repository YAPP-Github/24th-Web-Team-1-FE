import {
  SUBSCRIPTION_EMAIL_CLIENT_INFO,
  SUBSCRIPTION_EMAIL_SERVER_INFO,
} from "@main/constants/emailInfo";

export interface SubscriptionEmailClientInfo {
  time: keyof typeof SUBSCRIPTION_EMAIL_CLIENT_INFO.TIME;
  day: keyof typeof SUBSCRIPTION_EMAIL_CLIENT_INFO.DAY;
}
export interface SubscriptionEmailServerInfo {
  time: (typeof SUBSCRIPTION_EMAIL_SERVER_INFO.TIME)[keyof typeof SUBSCRIPTION_EMAIL_SERVER_INFO.TIME];
  date: string;
}
