import { useRouter, useSearchParams } from "next/navigation";

import queryClient from "@api/queryClient";

import useIsLogin from "@shared/hooks/useIsLogin";

import { WORKBOOK_BTNS } from "@workbook/constants/buttons";

import { QUERY_KEY } from "@main/remotes";

import WorkbookButtonItem from "../\bWorkbookButtonItem";
import useSusbscribeWorkbook from "@common/hooks/useSusbscribeWorkbook";

export default function WorkbookButton() {
  const isLogin = useIsLogin();
  const { postSubscribeWorkbook } = useSusbscribeWorkbook();
  const router = useRouter();

  const parms = useSearchParams();
  const workbookId = parms.get("workbookId") as string;

  const handleLoginClick = () => {
    postSubscribeWorkbook({
      workbookId: workbookId,
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

  return (
    <section className="px-[20px] pb-[44px]">
      {isLogin ? (
        <WorkbookButtonItem
          title={WORKBOOK_BTNS.SUB}
          handleClick={handleLoginClick}
        />
      ) : (
        <WorkbookButtonItem
          title={WORKBOOK_BTNS.LOGIN_AND_SUB}
          handleClick={handleWithoutLoginClick}
        />
      )}
    </section>
  );
}
