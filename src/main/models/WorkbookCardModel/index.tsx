import {
  WorkbookCardClientInfo,
  WorkbookCardServerInfo,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";
import { WebpBrowser } from "@shared/types/image";
import { WorkbookServerInfo } from "@workbook/types";

export class WorkbookCardModel {
  constructor({
    initWorkbookSeverList,
    initWorkbookSubscriptionInfoList,
    initWebpBrowser,
  }: {
    initWorkbookSeverList: WorkbookCardServerInfo[];
    initWorkbookSubscriptionInfoList?: WorkbookSubscriptionInfo[];
    initWebpBrowser: WebpBrowser;
  }) {
    this.workbookList = initWorkbookSeverList;
    if (initWorkbookSubscriptionInfoList)
      this.workbookSubscriptionInfoList = initWorkbookSubscriptionInfoList;
    this.workbookCombineList = this.getWorkbookServerCombineData();
    this.webpBrowser = initWebpBrowser;
  }
  get workbookCombineListData() {
    return this.workbookCombineList;
  }
  getWorkbookServerCombineData(): WorkbookCombineInfo[] {
    if (this.workbookSubscriptionInfoList) {
      const workbookCombineSet: WorkbookCombineInfoSet = {};

      const workbookSetList = this.transformDataToSet({
        data: this.workbookList,
      });
      const workbookSetSubscriptionInfoList = this.transformDataToSet({
        data: this.workbookSubscriptionInfoList,
      });

      for (const workbookKey in workbookSetList) {
        const isCommonKey =
          Object.prototype.hasOwnProperty.call(workbookSetList, workbookKey) &&
          Object.prototype.hasOwnProperty.call(
            workbookSetSubscriptionInfoList,
            workbookKey,
          );

        if (isCommonKey) {
          const subscriptionItem = workbookSetSubscriptionInfoList[workbookKey];
          const workbookItem = workbookSetList[workbookKey];

          workbookCombineSet[workbookKey] = {
            ...workbookItem,
            ...subscriptionItem,
          };
        } else {
          const workbookItem = workbookSetList[workbookKey];
          workbookCombineSet[workbookKey] = {
            ...workbookItem,
          };
        }
      }

      return Object.entries(workbookCombineSet).map(([key, value]) => ({
        id: Number(key.replace("card_", "")),
        ...value,
      })) as WorkbookCombineInfo[];
    }
    return this.workbookList;
  }

  workbookCardList({
    workbookCombineList,
  }: {
    workbookCombineList: WorkbookCombineInfo[];
  }): WorkbookCardClientInfo[] {
    return workbookCombineList.map(
      (
        {
          id,
          mainImageUrl,
          title,
          description,
          category,
          writers,
          subscriberCount,
          status,
          currentDay,
          totalDay,
          articleInfo,
          totalSubscriber,
        },
        idx,
      ) => {
        const cardType = this.getWorkbookCardType({ status, currentDay });
        const changeToClientData: WorkbookCardClientInfo = {
          id,
          badgeInfo: this.getBadeInfo({ cardType }),
          mainImageUrl: mainImageUrl,
          isPriorityImage: idx < 2,
          title,
          writers: this.getWriterNameList({ writers }),
          metaComponent: this.getMetaComponent({
            category,
            currentDay,
            totalDay,
          }),
          personCourse: this.getPersonCourse({
            totalSubscriber,
            subscriberCount,
            status,
          }),
          buttonTitle: this.getButtonTitle({
            cardType,
            currentDay,
          }),
          cardType,
          articleId: this.getArticleId({ articleInfo }),
        };
        return changeToClientData;
      },
    );
  }
  getWorkbookCardType({
    status,
    currentDay,
  }: {
    status: WorkbookSubscriptionInfo["status"] | undefined;
    currentDay: WorkbookSubscriptionInfo["currentDay"] | undefined;
  }): WorkbookCardClientInfo["cardType"] {
    if (status && currentDay) {
      if (status === "ACTIVE") return "LEARN";
      else return "SHARE";
    }
    return "SUBSCRIBE";
  }

  getBadeInfo({
    cardType,
  }: Pick<
    WorkbookCardClientInfo,
    "cardType"
  >): WorkbookCardClientInfo["badgeInfo"] {
    switch (cardType) {
      case "LEARN":
        return {
          title: "현재 학습중",
          className: "text-text-gray1 bg-[#f5f5f5]",
        };
      case "SHARE":
        return {
          title: "학습완료",
          className: "bg-success text-white text-[10px]",
        };
      default:
        return {};
    }
  }
  getWriterNameList({ writers }: { writers: WorkbookServerInfo["writers"] }) {
    return writers.map(({ name }) => name);
  }

  getMetaComponent({
    category,
    totalDay,
    currentDay,
  }: {
    category: WorkbookServerInfo["category"];
    totalDay: WorkbookSubscriptionInfo["totalDay"] | undefined;
    currentDay: WorkbookSubscriptionInfo["currentDay"] | undefined;
  }): WorkbookCardClientInfo["metaComponent"] {
    if (totalDay && currentDay) {
      if (totalDay === currentDay)
        return (
          <p className="body3-bold text-success">
            Day {currentDay}/{totalDay}
          </p>
        );
      return (
        <p className="text-white">
          <span className="body3-bold">Day {currentDay}</span>
          <span className="body3-medium">/{totalDay}</span>
        </p>
      );
    }
    return <p className="body3-medium text-white">{category}</p>;
  }

  getPersonCourse({
    totalSubscriber,
    subscriberCount,
    status,
  }: {
    totalSubscriber: WorkbookSubscriptionInfo["totalSubscriber"] | undefined;
    subscriberCount: WorkbookCardServerInfo["subscriberCount"];
    status: WorkbookSubscriptionInfo["status"] | undefined;
  }): WorkbookCardClientInfo["personCourse"] {
    if (status) {
      if (status === "ACTIVE") return `${subscriberCount}명 학습중`;
      if (status === "DONE") return `총 ${totalSubscriber}명`;
    }
    return `${subscriberCount}명 학습중`;
  }

  getButtonTitle({
    cardType,
    currentDay,
  }: {
    currentDay: WorkbookSubscriptionInfo["currentDay"] | undefined;
    cardType: WorkbookCardClientInfo["cardType"];
  }): WorkbookCardClientInfo["buttonTitle"] {
    if (currentDay) {
      if (cardType === "LEARN") return `Day ${currentDay} 학습하기`;
    }
    switch (cardType) {
      case "SUBSCRIBE":
        return "구독하기";

      default:
        return "공유하기";
    }
  }

  getArticleId({ articleInfo }: Pick<WorkbookCombineInfo, "articleInfo">) {
    if (articleInfo) {
      return JSON.parse(articleInfo).articleId;
    }
    return null;
  }
  transformDataToSet({
    data,
  }: {
    data: WorkbookCardServerInfo[] | WorkbookSubscriptionInfo[];
  }) {
    return data.reduce<WorkbookCombineInfoSet>((acc, item) => {
      const { id, ...rest } = item;
      acc[`card_${id}`] = {
        ...rest,
      };
      return acc;
    }, {});
  }

  private workbookList: WorkbookCardServerInfo[];
  private workbookSubscriptionInfoList: WorkbookSubscriptionInfo[] | undefined;
  private workbookCombineList: WorkbookCombineInfo[];
  private webpBrowser: WebpBrowser;
}

type WorkbookCombineInfo = WorkbookCardServerInfo &
  Partial<WorkbookSubscriptionInfo>;
type WorkbookCombineInfoSet = {
  [key: string]:
    | Omit<WorkbookCardServerInfo, "id">
    | Omit<Partial<WorkbookSubscriptionInfo>, "id">;
};
