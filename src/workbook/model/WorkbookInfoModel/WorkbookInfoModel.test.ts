import { WorkbookServerInfo } from "@workbook/types";
import { beforeEach, describe, expect, it } from "vitest";
import { WorkbookInfolModel } from ".";

const mockData: WorkbookServerInfo = {
  id: 1,
  name: 2,
  mainImageUrl:
    "https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0c2db3c3-340a-4654-8b79-5e125973af4d%2F%E1%84%83%E1%85%A2%E1%84%8C%E1%85%B5_29.webp&blockId=b245d009-e5f8-410f-b1a1-01d66bc6af84&width=3600",
  title: "사소한 것들의 역사 - 기술편",
  description:
    "기술의 역사 속 흥미로운 이야기를 통해 과거와 현재를 연결합니다. 제임스 와트의 라디에이터부터 다이슨의 혁신적인 발명품까지, 일상 속에서 쉽게 지나쳤던 기술들의 기원과 발전 과정을 흥미롭게 알아보세요. 이 책은 다양한 기술의 역사와 그 뒷이야기를 통해 독자들에게 새로운 통찰과 지식을 제공합니다.",
  category: "사회",
  createdAt: "2024-06-19T15:00:03.943077",
  writers: [
    {
      id: 1,
      name: "Fig.1",
      url: "https://www.fig1.kr/history",
    },
  ],
  articles: [
    {
      id: 1,
      title: "겨울철 노벨상 후보들",
    },
    {
      id: 2,
      title: "예나 지금이나 같은 킥보드 문제",
    },
    {
      id: 3,
      title: "스타일러, LG가 최초가 아니라고요?",
    },
    {
      id: 4,
      title: "마사지 기계의 시초는 바이브레이터?!",
    },
    {
      id: 5,
      title: "K(imchi)-냉장고와 아파트의 상관관계",
    },
    {
      id: 6,
      title: "셋 중 가장 늦게 발명된 것은?",
    },
    {
      id: 7,
      title: "의외로 다양하고 복잡한 자물쇠의 역사",
    },
    {
      id: 8,
      title: "80년 동안 바뀌지 않던 기술을 바꾼 다이슨",
    },
    {
      id: 9,
      title: "애플이 프린터도 만들어?",
    },
    {
      id: 10,
      title: "에어프라이어와 전자레인지가 뒤늦게 성공한 이유",
    },
    {
      id: 11,
      title: "선풍기와 에어서큘레이터 뭐가 다른 거죠?",
    },
    {
      id: 12,
      title: "로지텍 첫 마우스 못생김",
    },
    {
      id: 13,
      title: "다이슨이 얼마나 혁신적인지 역사로 알 수 있음",
    },
    {
      id: 14,
      title: "삐삐가 사라졌다고? 어제도 썼는데?!",
    },
    {
      id: 15,
      title: "에어컨 만든 사람 노벨평화상 줘라",
    },
    {
      id: 16,
      title: "한때 메시와 호날두가 뛰놀던 K-MP3 시장",
    },
    {
      id: 17,
      title: "전세계 콘센트 하나로 통일 좀 해줘라",
    },
    {
      id: 18,
      title: "인터넷, 위성으로 하는 거 아닌가요?",
    },
    {
      id: 19,
      title: "커피 부심이 있는 이탈리아인 아내를 두면 생기는 일",
    },
    {
      id: 20,
      title: "기괴한 세탁기의 세계..",
    },
    {
      id: 21,
      title: "결국 애플이 다 이기는 이어폰의 역사",
    },
  ],
};

describe("워크북 상세 모델 테스트", () => {
  let workbookInfoModel: WorkbookInfolModel;

  beforeEach(() => {
    workbookInfoModel = new WorkbookInfolModel({
      initWorkbookServerInfo: mockData,
      initWebpBrowser: { isWebpBrowser: false },
    });
  });

  it("워크북 클라이언트 상세 데이터 변환 테스트", () => {
    const workbookClientInfo = workbookInfoModel.workbookClientInfo;
    expect(workbookClientInfo).toEqual(
      expect.objectContaining({
        ...mockData,
        mainImageUrl:
          "https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0c2db3c3-340a-4654-8b79-5e125973af4d%2F%E1%84%83%E1%85%A2%E1%84%8C%E1%85%B5_29.png&blockId=b245d009-e5f8-410f-b1a1-01d66bc6af84&width=3600",
      }),
    );
  });
});
