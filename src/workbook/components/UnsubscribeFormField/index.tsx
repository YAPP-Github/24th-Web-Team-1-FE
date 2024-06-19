import React from "react";
import { Controller,useFormContext } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Textarea } from "@shared/components/ui/textarea";

import { UNSUBSCRIBE_FORM } from "@workbook/constants/unsubscribe";

const UnsubscribeFormField = () => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black text-sm font-medium">
            {UNSUBSCRIBE_FORM.TITLE}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={UNSUBSCRIBE_FORM.PLACEHOLDER}
              {...field}
              value={field.value || ""}
              maxLength={255}
              className={`rounded-[10px] text-[16px] focus-visible:ring-transparent ${formState.errors.reason ? "border-error" : ""}`}
            />
          </FormControl>
          <FormMessage className="text-gray1">
            {UNSUBSCRIBE_FORM.DESCRIPTION}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default UnsubscribeFormField;
