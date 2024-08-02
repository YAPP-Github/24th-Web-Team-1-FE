import { CategoryClientInfo } from "@common/types/category";
import { WorkbookCardModel } from "@main/models/WorkbookCardModel";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { getWorkbooksWithCategoryQueryOptions } from "@main/remotes/getWorkbooksWithCategoryQueryOptions";
import { useQueries } from "@tanstack/react-query";
import WorkbookCard from "../WorkbookCard";

export default function WorkbookCardList({ code, name }: CategoryClientInfo) {
  const workbookCardList = useQueries({
    queries: [
      getWorkbooksWithCategoryQueryOptions({ code }),
      getSubscriptionWorkbooksQueryOptions(),
    ],
    combine: (result) => {
      const [workbookServerList, workbookSubscriptionInfoList] = result;
      if (workbookServerList.data) {
        const workbookCardModel = new WorkbookCardModel({
          initWorkbookSeverList: workbookServerList.data,
          initWorkbookSubscriptionInfoList: workbookSubscriptionInfoList.data,
        });
        return workbookCardModel.workbookCardList({
          workbookCombineList: workbookCardModel.workbookCombineListData,
        });
      }
    },
  });

  return (
    <section className="mr-[18px] flex gap-[8px] overflow-x-auto">
      {workbookCardList &&
        workbookCardList.map((data, idx) => (
          <WorkbookCard key={`work-book-card-${idx}`} {...data} />
        ))}
    </section>
  );
}
