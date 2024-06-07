"use client"
import { ChangeEvent, useEffect, useState } from "react";

import SubscribePopup from "src/common/components/ExternalControlOpenDialog";
import { EMAIL_PLACEHOLDER, SUBSCRIBE_ACCEPT, SUBSCRIBE_ANNOUCE, SUBSCRIBE_REJECT, SUBSCRIBE_SUCCESS, SUBSCRIBE_TITLE_1, SUBSCRIBE_TITLE_2 } from "@main/constants/main";
import { Input } from "@shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { emailSubscribeSchema } from "@main/schemas";
import { useToast } from "@shared/components/ui/use-toast";
import { Button } from "@shared/components/ui/button";
import { EmailSubscribeFormData } from "@main/types";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black h3-bold text-lg">
    <div>{SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

  const { toast } = useToast()

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: EmailSubscribeFormData) => {
    try {
      emailSubscribeSchema.safeParse(values);
      console.log(values);
      // 폼 제출 성공 로직 추가

      setIsOpen(false)

      toast({
        title: SUBSCRIBE_SUCCESS,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          console.error(err.message);
          // 오류 메시지를 UI에 표시하는 로직 추가
        });
      }
    }
  }


  return (
    <main className="flex h-[100dvh] w-full flex-col items-center overflow-hidden">
      {
        isClient && (
          <SubscribePopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={SUBSCRIBE_POPUP_TITLE}
            content={
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={EMAIL_PLACEHOLDER} {...field} className={`rounded-[10px] focus-visible:ring-transparent text-[16px] ${form.formState.errors.email ? 'border-error' : ''}`} />
                        </FormControl>
                        <FormMessage />
                        <span className="text-[12px] font-semibold text-text-gray2 mt-[11px]">
                          {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE} <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}</a>과 <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}</a>에 {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
                        </span>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row w-full space-x-[8px]">
                    <Button onClick={() => setIsOpen(false)} variant={"outline"} className={"bg-white text-black font-medium text-[14px] w-1/2 rounded-none"}>{SUBSCRIBE_REJECT}</Button>
                    <Button type="submit" variant={"outline"} className={"bg-black text-white font-medium text-[14px] w-1/2 rounded-none"}>{SUBSCRIBE_ACCEPT}</Button>
                  </div>
                </form>
              </Form>
            }
          />
        )
      }
    </main>
  );
}
