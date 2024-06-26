import { FormProvider } from "react-hook-form";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import { buttonStyle } from "@workbook/constants/buttonStyle";

import { SUBSCRIBE_USER_ACTIONS } from "@subscription/constants/main";
import { useSubscribeForm } from "@subscription/hooks/useSubscribeForm";

import SubscribeFormField from "../SubscribeFormField";

export interface SubscribeFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubscribeForm({ setIsOpen }: SubscribeFormProps) {
  const { form, onSubmit } = useSubscribeForm();

  const handleSubmit = async (data: { email: string }) => {
    try {
      await onSubmit(data);
      setIsOpen(false);
    } catch (error) {
      throw new Error('invalid email') // 따로 처리 필요
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-[20px]">
        <SubscribeFormField />
        <div className="flex w-full flex-row space-x-[8px]">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            variant={"outline"}
            className={cn(
              "text-black",
              buttonStyle
            )}
          >
            {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_REJECT}
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className={cn(
              buttonStyle,
              "bg-black text-white"
            )}
          >
            {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_ACCEPT}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
