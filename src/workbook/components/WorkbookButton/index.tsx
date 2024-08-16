import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQueries } from "@tanstack/react-query";

import queryClient from "@api/queryClient";

import useIsLogin from "@shared/hooks/useIsLogin";

import { WORKBOOK_BTNS } from "@workbook/constants/buttons";
import { getWorkbookId } from "@workbook/utils";

import { ENTIRE_CATEGORY } from "@main/constants";
import { WorkbookCardModel } from "@main/models/WorkbookCardModel";
import { QUERY_KEY } from "@main/remotes";
import { getSubscriptionWorkbooksQueryOptions } from "@main/remotes/getSubscriptionWorkbooksQueryOptions";
import { getWorkbooksWithCategoryQueryOptions } from "@main/remotes/getWorkbooksWithCategoryQueryOptions";

import WorkbookButtonItem from "../\bWorkbookButtonItem";
import useSusbscribeWorkbook from "@common/hooks/useSusbscribeWorkbook";

export default function WorkbookButton() {
  const isLogin = useIsLogin();
  const { postSubscribeWorkbook } = useSusbscribeWorkbook();
  const router = useRouter();

  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const workbookInfo = useQueries({
    queries: [
      getWorkbooksWithCategoryQueryOptions({
        code: ENTIRE_CATEGORY,
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
        });

        // 특정 워크북 ID에 따른 필터링 적용
        const targetWorkbookId = Number(workbookId);
        const filteredWorkbookCombineList =
          workbookCardModel.workbookCombineListData.filter(
            (workbook) => workbook.id === targetWorkbookId,
          );

        return workbookCardModel.workbookCardList({
          workbookCombineList: filteredWorkbookCombineList,
        });
      }
    },
  });

  const handleLoginSubClick = () => {
    postSubscribeWorkbook({
      workbookId: workbookId.toString(),
      handleSucess: () => {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEY.GET_SUBSCRIBE_WORKBOOKS],
        });
        queryClient.refetchQueries({
          queryKey: [QUERY_KEY.GET_WORKBOOKS_WITH_CATEGORY],
        });
      },
    });
  };

  const handleWithoutLoginClick = () => {
    router.push("/auth");
  };

  const handleStudy = () => {
    if (workbookInfo) {
      router.push(`/article/${workbookInfo[0].articleId}?workbookId=${workbookId}`)
    }
  }

  console.log("workbookInfo ", workbookInfo);

  return (
    <section className="px-[20px] pb-[44px]">
      {isLogin && workbookInfo ? (
        <>
          {workbookInfo[0].cardType === "SUBSCRIBE" ? (
            <WorkbookButtonItem
              title={WORKBOOK_BTNS.SUB}
              handleClick={handleLoginSubClick}
            />
          ) : (
            <WorkbookButtonItem
              title={WORKBOOK_BTNS.STUDY}
              handleClick={handleStudy}
            />
          )}
        </>
      ) : (
        <WorkbookButtonItem
          title={WORKBOOK_BTNS.LOGIN_AND_SUB}
          handleClick={handleWithoutLoginClick}
        />
      )}
    </section>
  );
}
