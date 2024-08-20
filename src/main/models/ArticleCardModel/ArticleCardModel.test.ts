import { ArticleServerInfo } from "@main/types/article";
import { beforeEach, describe, expect, it } from "vitest";
import ArticleCardModel from ".";

const mockData: ArticleServerInfo[] = [
  {
    id: 1,
    writer: {
      id: 1,
      name: "안나포",
      url: "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
      imageUrl:
        "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    },
    title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
    content: "ECONOMY",
    problemIds: [1, 2, 3],
    category: "경제",
    createdAt: "2024-07-25T14:32:27.310368",
    views: 1,
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",

    workbooks: [
      {
        id: 1,
        title: "사소한 것들의 역사",
      },
      {
        id: 2,
        title: "인모스트 경제레터",
      },
    ],
  },
  {
    id: 2,
    writer: {
      id: 1,
      name: "몰티즈",
      url: "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
      imageUrl:
        "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    },
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
    content: "ECONOMY",
    problemIds: [1, 2, 3],
    category: "경제",
    createdAt: "2024-07-25T14:32:27.310368",
    views: 1,
    workbooks: [
      {
        id: 1,
        title: "사소한 것들의 역사",
      },
      {
        id: 2,
        title: "인모스트 경제레터",
      },
    ],
  },
];

describe("메인 아티클 카드 모델 테스트", () => {
  let articleCardModel: ArticleCardModel;

  beforeEach(() => {
    articleCardModel = new ArticleCardModel({
      initArticleCardServerList: mockData,
      initWebpBrowser: { isWebpBrowser: true },
    });
  });
  it("아티클 클라이언트 카드 데이터 변환 테스트", () => {
    const articleCardClientList = articleCardModel.articleCardList();
    expect(articleCardClientList).toEqual([
      expect.objectContaining({
        id: 1,
        writerInfo: {
          name: "안나포",
          url: "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
        },
        title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
        content: "ECONOMY",
        category: "경제",
        viewCount: 1,
        thumbnail:
          "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
        withWorkbookList: [
          {
            id: 1,
            title: "사소한 것들의 역사",
          },
          {
            id: 2,
            title: "인모스트 경제레터",
          },
        ],
      }),
      expect.objectContaining({
        id: 2,
        writerInfo: {
          name: "몰티즈",
          url: "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
        },
        thumbnail:
          "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
        title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
        content: "ECONOMY",
        category: "경제",
        viewCount: 1,
        withWorkbookList: [
          {
            id: 1,
            title: "사소한 것들의 역사",
          },
          {
            id: 2,
            title: "인모스트 경제레터",
          },
        ],
      }),
    ]);
  });
});
