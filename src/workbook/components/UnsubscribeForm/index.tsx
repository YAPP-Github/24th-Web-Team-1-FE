import { FormProvider } from "react-hook-form";

import { Button } from "@shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { Textarea } from "@shared/components/ui/textarea";
import { cn } from "@shared/utils/cn";

import { buttonStyle } from "@workbook/constants/buttonStyle";
import { UNSUBSCRIBE_FORM } from "@workbook/constants/unsubscribe";
import { useUnsubscribeForm } from "@workbook/hooks/useUnsubscribeForm";

export default function UnsubscribeForm() {
  const { form, onSubmit } = useUnsubscribeForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-sm font-medium">{UNSUBSCRIBE_FORM.TITLE}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={UNSUBSCRIBE_FORM.PLACEHOLDER}
                  {...field}
                  value={field.value || ""}
                  maxLength={255}
                  className={`rounded-[10px] text-[16px] focus-visible:ring-transparent ${form.formState.errors.reason ? "border-error" : ""}`}
                />
              </FormControl>
              <FormMessage className="text-gray1">
                {UNSUBSCRIBE_FORM.DESCRIPTION}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row space-x-[8px]">
          <Button
            type="button"
            variant={"outline"}
            className={cn(
              "border-text-gray3 text-black",
              buttonStyle
            )}
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
