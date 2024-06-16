import { FormProvider } from "react-hook-form";

import { Button } from "@shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";

import {
  EMAIL_CONTROL,
  SUBSCRIBE_ANNOUCE,
  SUBSCRIBE_USER_ACTIONS,
} from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";

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
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={EMAIL_CONTROL.EMAIL_PLACEHOLDER}
                  {...field}
                  value={field.value || ""}
                  className={`rounded-[10px] text-[16px] focus-visible:ring-transparent ${form.formState.errors.email ? "border-error" : ""}`}
                />
              </FormControl>
              <FormMessage />
              <span className="mt-[11px] text-[12px] font-semibold text-text-gray2">
                {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE}{" "}
                <a className="text-[12px] font-semibold underline">
                  {SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}
                </a>
                과{" "}
                <a className="text-[12px] font-semibold underline">
                  {SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}
                </a>
                에 {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
              </span>
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row space-x-[8px]">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            variant={"outline"}
            className={
              "w-1/2 rounded-none bg-white text-[14px] font-medium text-black"
            }
          >
            {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_REJECT}
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className={
              "w-1/2 rounded-none bg-black text-[14px] font-medium text-white"
            }
          >
            {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_ACCEPT}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
