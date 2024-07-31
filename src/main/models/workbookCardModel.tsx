import {
  WorkbookClientInfo,
  WorkbookServerInfo,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";

export class WorkbookCardModel {
  constructor({
    initWorkbookSeverList,
    initWorkbookSubscriptionInfoList,
  }: {
    initWorkbookSeverList: WorkbookServerInfo[];
    initWorkbookSubscriptionInfoList?: WorkbookSubscriptionInfo[];
  }) {
    this.workbookList = initWorkbookSeverList;
    if (initWorkbookSubscriptionInfoList)
      this.workbookSubscriptionInfoList = initWorkbookSubscriptionInfoList;
    this.workbookCombineList = this.getWorkbookServerCombineData();
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
        id: Number(key),
        ...value,
      })) as WorkbookCombineInfo[];
    }
    return this.workbookList;
  }

  workbookCardList({
    workbookCombineList,
  }: {
    workbookCombineList: WorkbookCombineInfo[];
  }): WorkbookClientInfo[] {
    return workbookCombineList.map(
      ({
        mainImageUrl,
        title,
        description,
        category,
        writers,
        subscriberCount,
        status,
        currentDay,
        totalDay,
      }) => {
        const changeToClientData: WorkbookClientInfo = {
          mainImageUrl,
          title,
          writers: this.getWriterNameList({ writers }),
          metaComponent: this.getMetaComponent({
            category,
            currentDay,
            totalDay,
          }),
          personCourse: this.getPersonCourse({
            subscriberCount,
            status,
          }),
          buttonTitle: this.getButtonTitle({
            status,
            currentDay,
          }),
        };
        return changeToClientData;
      },
    );
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
  }): WorkbookClientInfo["metaComponent"] {
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
    subscriberCount,
    status,
  }: {
    subscriberCount: WorkbookServerInfo["subscriberCount"];
    status: WorkbookSubscriptionInfo["status"] | undefined;
  }): WorkbookClientInfo["personCourse"] {
    if (status) {
      if (status === "ACTIVE") return `${subscriberCount}명 학습중`;
      if (status === "DONE") return `총 ${subscriberCount}명`;
    }
    return `${subscriberCount}명 학습중`;
  }

  getButtonTitle({
    status,
    currentDay,
  }: {
    status: WorkbookSubscriptionInfo["status"] | undefined;
    currentDay: WorkbookSubscriptionInfo["currentDay"] | undefined;
  }): WorkbookClientInfo["buttonTitle"] {
    if (status && currentDay) {
      if (status === "ACTIVE") return `Day ${currentDay} 학습하기`;
      if (status === "DONE") return "공유하기";
    }
    return "구독하기";
  }

  transformDataToSet({
    data,
  }: {
    data: WorkbookServerInfo[] | WorkbookSubscriptionInfo[];
  }) {
    return data.reduce<WorkbookCombineInfoSet>((acc, item) => {
      const { id, ...rest } = item;
      acc[id] = {
        ...rest,
      };
      return acc;
    }, {});
  }

  private workbookList: WorkbookServerInfo[];
  private workbookSubscriptionInfoList: WorkbookSubscriptionInfo[] | undefined;
  private workbookCombineList: WorkbookCombineInfo[];
}

type WorkbookCombineInfo = WorkbookServerInfo &
  Partial<WorkbookSubscriptionInfo>;
type WorkbookCombineInfoSet = {
  [key: number]:
    | Omit<WorkbookServerInfo, "id">
    | Omit<Partial<WorkbookSubscriptionInfo>, "id">;
};
