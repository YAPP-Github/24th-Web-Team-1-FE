import { toast } from "@shared/components/ui/use-toast";
import { SUBSCRIBE_USER_ACTIONS } from "@subscription/constants/subscribe";
import { subscribeWorkbookOptions } from "@subscription/remotes/postSubscriptionQueryOptions";
import { useMutation } from "@tanstack/react-query";

export default function useSusbscribeWorkbook() {
  const { mutate: subscribeWorkbook } = useMutation(subscribeWorkbookOptions());
  const postSubscribeWorkbook = ({
    workbookId,
    handleSucess,
  }: {
    workbookId: string;
    handleSucess?: () => void;
  }) => {
    try {
      subscribeWorkbook(
        { workbookId },
        {
          onSuccess: () => {
            toast({
              title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_SUCCESS,
            });
            if (handleSucess) handleSucess();
          },
          onError: (error) => {
            let errorMessage = SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_FAIL;
            if (error && error.data && error.data.message) {
              errorMessage = error.data.message || errorMessage;
            }
            toast({
              title: errorMessage,
            });
          },
        },
      );
    } catch (error) {
      console.error("catch error", error);

      toast({
        title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_FAIL,
      });
    }
  };
  return { postSubscribeWorkbook };
}
