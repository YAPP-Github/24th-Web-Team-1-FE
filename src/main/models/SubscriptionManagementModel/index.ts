import {
  SUBSCRIPTION_DAYS,
  SUBSCRIPTION_EMAIL_SERVER_INFO,
} from "@main/constants/emailInfo";
import {
  SubscriptionEmailClientInfo,
  SubscriptionEmailServerInfo,
} from "@main/types/emailInfo";
import { SubscriptionManagementClientInfo , WorkbookSubscriptionInfo } from "@main/types/workbook";


export class SubscriptionManagementModel {
  constructor({
    initSubscriptionManagementServerList,
  }: {
    initSubscriptionManagementServerList: WorkbookSubscriptionInfo[];
  }) {
    this.subscriptionManagementServerList =
      initSubscriptionManagementServerList;
  }

  get SubscriptionMangementClientList(): SubscriptionManagementClientInfo[] {
    return this.subscriptionManagementServerList.map((subscriptionInfo) => ({
      workbookId: subscriptionInfo.id.toString(),
      isSubscription: true,
      dayInfo: {
        totalDay: subscriptionInfo.totalDay,
        currentDay: subscriptionInfo.currentDay,
      },
    }));
  }

  get SubscriptionEmailManagementClientInfo(): SubscriptionEmailClientInfo {
    const subscriptionServerInfo =
      this.subscriptionManagementServerList[0].subscription;

    return {
      day: this.getDayClientInfo({ date: subscriptionServerInfo.date }),
      time: this.getTimeClientInfo({ time: subscriptionServerInfo.time }),
    };
  }

  static getDayPostInfo({ day }: Pick<SubscriptionEmailClientInfo, "day">) {
    switch (day) {
      case "EVERY_DAYS":
        return SUBSCRIPTION_EMAIL_SERVER_INFO.DAY["EVERY_DAYS"];
      case "WEEK_DAYS":
        return SUBSCRIPTION_EMAIL_SERVER_INFO.DAY["WEEK_DAYS"];
    }
  }

  static getTimePostInfo({ time }: Pick<SubscriptionEmailClientInfo, "time">) {
    return SUBSCRIPTION_EMAIL_SERVER_INFO.TIME[time];
  }

  private getDayClientInfo({
    date,
  }: Pick<
    SubscriptionEmailServerInfo,
    "date"
  >): SubscriptionEmailClientInfo["day"] {
    switch (date) {
      case SUBSCRIPTION_EMAIL_SERVER_INFO.DAY["EVERY_DAYS"]:
        return SUBSCRIPTION_DAYS["EVERY_DAYS"];

      default:
        return SUBSCRIPTION_DAYS["WEEK_DAYS"];
    }
  }

  private getTimeClientInfo({
    time,
  }: Pick<
    SubscriptionEmailServerInfo,
    "time"
  >): SubscriptionEmailClientInfo["time"] {
    switch (time) {
      case SUBSCRIPTION_EMAIL_SERVER_INFO.TIME["06"]:
        return "06";
      case SUBSCRIPTION_EMAIL_SERVER_INFO.TIME["07"]:
        return "07";
      case SUBSCRIPTION_EMAIL_SERVER_INFO.TIME["08"]:
        return "08";
      case SUBSCRIPTION_EMAIL_SERVER_INFO.TIME["09"]:
        return "09";
      case SUBSCRIPTION_EMAIL_SERVER_INFO.TIME["10"]:
        return "10";
    }
  }

  private subscriptionManagementServerList: WorkbookSubscriptionInfo[];
}