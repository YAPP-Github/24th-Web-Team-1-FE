import React from "react";
import { Controller,useFormContext } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Textarea } from "@shared/components/ui/textarea";
import { cn } from "@shared/utils/cn";

import { UNSUBSCRIBE_FORM } from "@subscription/constants/unsubscribe";

const UnsubscribeFormField = () => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name="opinion"
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
              className={cn(
                "rounded-[10px] text-[14px] focus-visible:ring-transparent",
                { 'border-error': formState.errors.opinion }
              )}
            />
          </FormControl>
          <FormMessage className="text-text-gray1">
            {UNSUBSCRIBE_FORM.DESCRIPTION}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default UnsubscribeFormField;
