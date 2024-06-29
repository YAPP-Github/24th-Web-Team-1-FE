import { useRouter } from "next/navigation";

import { FormProvider } from "react-hook-form";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import { buttonStyle } from "@workbook/constants/buttonStyle";

import { UNSUBSCRIBE_FORM } from "@subscription/constants/unsubscribe";
import { useArticleInfo } from "@subscription/hooks/useArticleInfo";
import { useUnsubscribeForm } from "@subscription/hooks/useUnsubscribeForm";

import UnsubscribeFormField from "../UnsubscribeFormField";

export default function UnsubscribeForm() {
  const { form, onSubmit } = useUnsubscribeForm();
  const router = useRouter()

  const { articleId, workbookId } = useArticleInfo()

  const handleClickBack = () => {
    router.push(`/article/${articleId}?workbookId=${workbookId}`)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
        <UnsubscribeFormField />
        <div className="flex w-full flex-row space-x-[8px]">
          <Button
            type="button"
            variant={"outline"}
            className={cn(
              "border-text-gray3 text-black",
              buttonStyle
            )}
            onClick={handleClickBack}
          >
            {UNSUBSCRIBE_FORM.BACK}
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className={cn(
              "border-error text-error",
              buttonStyle
            )}
          >
            {UNSUBSCRIBE_FORM.CONFIRM}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
