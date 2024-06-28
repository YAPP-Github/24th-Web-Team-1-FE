import React from "react";
import { Controller,useFormContext } from "react-hook-form";

import { FormControl, FormItem, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";

import { EMAIL_CONTROL, SUBSCRIBE_ANNOUCE } from "@subscription/constants/subscribe";

const SubscribeFormField = () => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={EMAIL_CONTROL.EMAIL_PLACEHOLDER}
              {...field}
              value={field.value || ""}
              className={`rounded-[10px] text-[16px] focus-visible:ring-transparent h-[48px] ${formState.errors.email ? "border-error" : ""}`}
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
  );
};

export default SubscribeFormField;
