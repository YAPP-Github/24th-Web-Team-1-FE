import { beforeEach, describe, expect, it } from "vitest";

import { WorkbookSubscriptionInfo } from "@main/types/workbook";

import { SubscriptionManagementModel } from ".";

const mockData: WorkbookSubscriptionInfo[] = [
  {
    id: 1,
    status: "ACTIVE",
    totalDay: 3,
    currentDay: 1,
    rank: 0,
    totalSubscriber: 100,
    articleInfo: "{}",
    subscription: { date: "1111111", time: "09:00" },
  },
  {
    id: 2,
    status: "ACTIVE",
    totalDay: 3,
    currentDay: 2,
    rank: 0,
    totalSubscriber: 1,
    articleInfo: "{}",
    subscription: { date: "1111111", time: "09:00" },
  },
  {
    id: 3,
    status: "DONE",
    totalDay: 3,
    currentDay: 3,
    rank: 0,
    totalSubscriber: 2,
    articleInfo: "{}",
    subscription: { date: "0011111", time: "09:00" },
  },
];

describe("구독 관리 모델 테스트", () => {
  let subscriptionManagementModel: SubscriptionManagementModel;

  beforeEach(() => {
    subscriptionManagementModel = new SubscriptionManagementModel({
      initSubscriptionManagementServerList: mockData,
    });
  });
  it("구독 관리 리스트 반환환 테스트", () => {
    const subscriptionManagementClientList =
      subscriptionManagementModel.SubscriptionMangementClientList;
    expect(subscriptionManagementClientList).toEqual([
      expect.objectContaining({
        workbookId: "1",
        isSubscription: true,
        dayInfo: { totalDay: 3, currentDay: 1 },
      }),
      expect.objectContaining({
        workbookId: "2",
        isSubscription: true,
        dayInfo: { totalDay: 3, currentDay: 2 },
      }),
      expect.objectContaining({
        workbookId: "3",
        isSubscription: true,
        dayInfo: { totalDay: 3, currentDay: 3 },
      }),
    ]);
  });
  it("구독 관리 내부 이메일 상태 테스트", () => {
    const subscriptionEmailManagementClientInfo =
      subscriptionManagementModel.SubscriptionEmailManagementClientInfo;
    expect(subscriptionEmailManagementClientInfo).toEqual({
      day: "EVERY_DAYS",
      time: "09",
    });
  });
});
