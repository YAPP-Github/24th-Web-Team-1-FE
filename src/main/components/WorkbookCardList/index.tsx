import { CategoryClientInfo } from "@common/types/category";
import { WorkbookCardModel } from "@main/models/WorkbookCardModel";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { getWorkbooksWithCategoryQueryOptions } from "@main/remotes/getWorkbooksWithCategoryQueryOptions";
import { useQueries } from "@tanstack/react-query";
import WorkbookCard from "../WorkbookCard";
import WorkbookCardListSkeleton from "../WorkbookCardListSkeleton";

export default function WorkbookCardList({
  code,
}: Partial<CategoryClientInfo>) {
  const workbookCardList = useQueries({
    queries: [
      getWorkbooksWithCategoryQueryOptions({ code: code || -1 }),
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

  if (!workbookCardList) return <WorkbookCardListSkeleton />;

  return (
    <section className="mr-[18px] flex gap-[8px] overflow-x-auto">
      {workbookCardList &&
        workbookCardList.map((data, idx) => (
          <WorkbookCard key={`work-book-card-${idx}`} {...data} />
        ))}
    </section>
  );
}
