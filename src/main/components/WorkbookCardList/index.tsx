import { WorkbookCardModel } from "@main/models/workbookCardModel";
import {
  WorkbookServerInfo,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";
import WorkbookCard from "../WorkbookCard";
// TODO : api 연결필요 + mock
const data: WorkbookServerInfo[] = [
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
const subData: WorkbookSubscriptionInfo[] = [
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

interface WorkbookCardListProps {
  category: string;
}
export default function WorkbookCardList({ category }: WorkbookCardListProps) {
  const workbookCardModel = new WorkbookCardModel({
    initWorkbookSeverList: data,
    initWorkbookSubscriptionInfoList: subData,
  });
  return (
    <section className="mr-[18px] flex gap-[8px] overflow-x-auto">
      {workbookCardModel
        .workbookCardList({
          workbookCombineList: workbookCardModel.workbookCombineListData,
        })
        .map((data, idx) => (
          <WorkbookCard key={`work-book-card-${idx}`} {...data} />
        ))}
    </section>
  );
}
