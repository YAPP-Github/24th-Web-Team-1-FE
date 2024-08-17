"use client";
import { Button } from "@shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";

import {
  EMAIL_CONTROL,
  SUBSCRIBE_ANNOUCE,
} from "@subscription/constants/subscribe";

import { LOGIN_OR_SIGNUP } from "@auth/constants/auth";
import { useEmailForm } from "@auth/hooks/useEmailForm";
import { useLoginFailToast } from "@auth/hooks/useLoginFailToast";

export default function EmailForm() {
  const { form, onSubmitEmail } = useEmailForm();
  const { handleSubmit, control, formState } = form;

  useLoginFailToast();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-8">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sub2-bold text-black">이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder={EMAIL_CONTROL.EMAIL_PLACEHOLDER}
                  {...field}
                  className={`h-[48px] rounded-[10px] text-[16px] focus-visible:ring-transparent ${formState.errors.email ? "border-error" : ""}`}
                />
              </FormControl>
              <FormMessage />
              <span className="sub3-semibold mt-[11px] text-text-gray2">
                {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE}{" "}
                {SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}과{" "}
                {SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}에{" "}
                {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
              </span>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-[56px] w-full rounded-none bg-main py-6 text-white"
        >
          {LOGIN_OR_SIGNUP}
        </Button>
      </form>
    </Form>
  );
}
