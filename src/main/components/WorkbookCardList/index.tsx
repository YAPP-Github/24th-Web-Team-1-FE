import { CategoryClientInfo } from "@common/types/category";
import { ENTIRE_CATEGORY } from "@main/constants";
import { WorkbookCardModel } from "@main/models/WorkbookCardModel";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { getWorkbooksWithCategoryQueryOptions } from "@main/remotes/getWorkbooksWithCategoryQueryOptions";
import useIsLogin from "@shared/hooks/useIsLogin";
import useIsWebpBrowser from "@shared/hooks/useIsWebpBrowser";
import { useQueries } from "@tanstack/react-query";
import WorkbookCard from "../WorkbookCard";
import WorkbookCardListSkeleton from "../WorkbookCardListSkeleton";

export default function WorkbookCardList({
  code,
}: Partial<CategoryClientInfo>) {
  const { isWebpBrowser } = useIsWebpBrowser();
  const isLogin = useIsLogin();
  const workbookCardList = useQueries({
    queries: [
      getWorkbooksWithCategoryQueryOptions({
        code: code !== undefined ? code : ENTIRE_CATEGORY,
      }),
      {
        ...getSubscriptionWorkbooksQueryOptions(),
        enabled: isLogin === true,
      },
    ],
    combine: (result) => {
      const [workbookServerList, workbookSubscriptionInfoList] = result;
      if (workbookServerList.data) {
        const workbookCardModel = new WorkbookCardModel({
          initWorkbookSeverList: workbookServerList.data,
          initWorkbookSubscriptionInfoList: workbookSubscriptionInfoList.data,
          initWebpBrowser: { isWebpBrowser },
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
      {workbookCardList.map((data, idx) => (
        <WorkbookCard key={`work-book-card-${idx}`} {...data} />
      ))}
    </section>
  );
}
