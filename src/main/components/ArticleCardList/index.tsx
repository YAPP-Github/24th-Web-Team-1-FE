import { CategoryInfo } from "@common/types/category";
import ArticleCardModel from "@main/models/ArticleCardModel";
import { ArticleServerInfo } from "@main/types/article";
import ArticleCard from "../ArticleCard";

const data: ArticleServerInfo[] = [
  {
    id: 1,
    writer: {
      id: 1,
      name: "안나포",
      url: "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    },
    title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
    content:
      "오늘날 전동 킥보드의 인기는 누가 뭐래도 전동 킥보드 공유 서비스가 등장하면서부터입니다. 공유 서비스가 등장하기 이전 전동 킥보드는 주로 레저용으로 사용되다가 공유형 전동킥보드 서비스가 등장하면서 이동 수단으로 사용되기 시작합니다.Y",
    problemIds: [1, 2, 3],
    category: "경제",
    createdAt: "2024-07-25T14:32:27.310368",
    views: 1,
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",

    includedWorkbooks: [
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
    },
    mainImageUrl:
      "https://storage.mrblog.net/files/dosi_draw/a3NgiDGW2H3NhsYp1Qp3RuWNzUx9sg8L2yyooYqF.jpg",
    title: "ETF(상장 지수 펀드)란? 모르면 손해라고?",
    content: "ECONOMY",
    problemIds: [1, 2, 3],
    category: "경제",
    createdAt: "2024-07-25T14:32:27.310368",
    views: 1,
    includedWorkbooks: [
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

export default function ArticleCardList({ code, name }: CategoryInfo) {
  const articleCardModel = new ArticleCardModel({
    initArticleCardServerList: data,
  });

  return (
    <>
      {articleCardModel.articleCardList().map((data, idx) => (
        <ArticleCard {...data} key={`article-card-${idx}`} />
      ))}
    </>
  );
}
