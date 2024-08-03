"use client";
import queryClient from "@api/queryClient";
import useSusbscribeWorkbook from "@common/hooks/useSusbscribeWorkbook";
import { QUERY_KEY } from "@main/remotes";
import { WorkbookClientInfo } from "@main/types/workbook";
import { onClickLinkCopy } from "@shared/utils/onClickLinkCopy";
import { useRouter } from "next/navigation";

export default function useWorkbookCardBottomButtonEvent({
  cardType,
  id: workbookId,
  articleId,
}: Pick<WorkbookClientInfo, "cardType" | "id" | "articleId">) {
  let handleButtonClick;
  const { push } = useRouter();
  const { postSubscribeWorkbook } = useSusbscribeWorkbook();

  const clickShareButton = () => {
    onClickLinkCopy({
      href: `${process.env.NEXT_PUBLIC_FEW_WEB}/workbook/${workbookId}`,
    });
  };

  const clickSubscribeButton = () => {
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

  const clickLearnButton = () => {
    push(`/article/${articleId}`);
  };

  switch (cardType) {
    case "SHARE":
      handleButtonClick = clickShareButton;
      break;

    case "SUBSCRIBE":
      handleButtonClick = clickSubscribeButton;
      break;

    default:
      handleButtonClick = clickLearnButton;
      break;
  }

  return { handleButtonClick };
}
