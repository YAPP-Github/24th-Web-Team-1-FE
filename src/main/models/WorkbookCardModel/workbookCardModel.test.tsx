import {
  WorkbookServerInfo,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";
import { beforeEach, describe, expect, it } from "vitest";
import { WorkbookCardModel } from ".";

// 테스트 데이터
const mockWorkbookServerList: WorkbookServerInfo[] = [
  {
    id: 1,
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    title: "몰티즈는 참지않긔",
    description:
      "몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔",
    category: "경제",
    createdAt: "2024-07-25 14:32:35",
    writers: [
      {
        id: 1,
        name: "name1",
        url: "https://example.com",
      },
    ],
    subscriberCount: 1,
  },
  {
    id: 2,
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    title:
      "몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔",
    description:
      "몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔 몰티즈는 참지않긔",
    category: "경제",
    createdAt: "2024-07-25 14:32:35",
    writers: [
      {
        id: 2,
        name: "name2",
        url: "https://example.com",
      },
    ],
    subscriberCount: 2,
  },
];
const mockWorkbookSubscriptionInfoList: WorkbookSubscriptionInfo[] = [
  {
    id: 1,
    status: "ACTIVE",
    totalDay: 10,
    currentDay: 1,
    rank: 0,
    totalSubscriber: 100,
    articleInfo: "{}",
  },
  {
    id: 2,
    status: "DONE",
    totalDay: 10,
    currentDay: 10,
    rank: 22,
    totalSubscriber: 100,
    articleInfo: "{}",
  },
];

describe("메인 워크북 카드 모델 테스트", () => {
  let model: WorkbookCardModel;

  beforeEach(() => {
    model = new WorkbookCardModel({
      initWorkbookSeverList: mockWorkbookServerList,
      initWorkbookSubscriptionInfoList: mockWorkbookSubscriptionInfoList,
    });
  });

  it("api 2개/1개 호출 후, 서버 데이터 합친 결과 확인 하기", () => {
    const combinedData = model.getWorkbookServerCombineData();
    expect(combinedData).toEqual([
      expect.objectContaining({
        ...mockWorkbookServerList[0],
        ...mockWorkbookSubscriptionInfoList[0],
      }),
      expect.objectContaining({
        ...mockWorkbookServerList[1],
        ...mockWorkbookSubscriptionInfoList[1],
      }),
    ]);
  });

  it("워크북리스트 및 구독정보 set 형태로 잘 바뀌는지 테스트", () => {
    const serverSet = model.transformDataToSet({
      data: mockWorkbookServerList,
    });
    const subscriptionSet = model.transformDataToSet({
      data: mockWorkbookSubscriptionInfoList,
    });

    expect(serverSet).toHaveProperty("card_1");
    expect(subscriptionSet).toHaveProperty("card_1");
  });

  it("데이터 합치고 버튼 타이틀 확인하기", () => {
    const workbookCardList = model.workbookCardList({
      workbookCombineList: model.getWorkbookServerCombineData(),
    });

    expect(workbookCardList).toHaveLength(2);
    expect(workbookCardList[0]).toHaveProperty("buttonTitle", "Day 1 학습하기");
    expect(workbookCardList[1]).toHaveProperty("buttonTitle", "공유하기");
  });

  it("워크북 카드 타입 테스트", () => {
    const workbookCardLearn = model.getWorkbookCardType({
      status: "ACTIVE",
      currentDay: 10,
    });
    expect(workbookCardLearn).toBe("LEARN");

    const workbookCardShare = model.getWorkbookCardType({
      status: "DONE",
      currentDay: 10,
    });
    expect(workbookCardShare).toBe("SHARE");

    const workbookCardSubscribe = model.getWorkbookCardType({
      status: "ACTIVE",
      currentDay: 0,
    });
    expect(workbookCardSubscribe).toBe("SUBSCRIBE");
  });

  it("이미지 좌측 상단 뱃지 테스트", () => {
    const badgeLearn = model.getBadeInfo({ cardType: "LEARN" });
    expect(badgeLearn).toStrictEqual({
      title: "현재 학습중",
      className: "text-text-gray1 bg-[#f5f5f5]",
    });

    const badgeShare = model.getBadeInfo({ cardType: "SHARE" });
    expect(badgeShare).toStrictEqual({
      title: "학습완료",
      className: "bg-success text-white text-[10px]",
    });

    const badgeSubscribe = model.getBadeInfo({ cardType: "SUBSCRIBE" });
    expect(badgeSubscribe).toStrictEqual({});
  });
  it("작가이름 리스트로 변환", () => {
    const writerNames = model.getWriterNameList({
      writers: mockWorkbookServerList[0].writers,
    });
    expect(writerNames).toEqual(["name1"]);
  });

  it("meta component 생성 테스트", () => {
    const metaComponentActive = model.getMetaComponent({
      category: "경제",
      currentDay: 10,
      totalDay: 1,
    });
    expect(metaComponentActive).contains(/Day 1\/10/);

    const metaComponentCompleted = model.getMetaComponent({
      category: "경제",
      currentDay: 10,
      totalDay: 10,
    });
    expect(metaComponentCompleted).contains(/Day 10\/10/);
  });

  it("학습중 상태에 따른 인원 텍스트 함수 테스트", () => {
    const personCourseActive = model.getPersonCourse({
      subscriberCount: 10,
      status: "ACTIVE",
    });
    expect(personCourseActive).toBe("10명 학습중");

    const personCourseDone = model.getPersonCourse({
      subscriberCount: 20,
      status: "DONE",
    });
    expect(personCourseDone).toBe("총 20명");
  });

  it("구독상태에 따른 버튼 타이틀 테스트", () => {
    const buttonTitleActive = model.getButtonTitle({
      cardType: "LEARN",
      currentDay: 5,
    });
    expect(buttonTitleActive).toBe("Day 5 학습하기");

    const buttonTitleDone = model.getButtonTitle({
      cardType: "SHARE",
      currentDay: 10,
    });
    expect(buttonTitleDone).toBe("공유하기");
  });
});
