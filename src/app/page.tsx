"use client"
import { ChangeEvent, useEffect, useState } from "react";

import SubscribePopup from "@main/components/SubscribePopup";
import { EMAIL_PLACEHOLDER, SUBSCRIBE_ACCEPT, SUBSCRIBE_ANNOUNCE_1, SUBSCRIBE_ANNOUNCE_2, SUBSCRIBE_ANNOUNCE_3, SUBSCRIBE_ANNOUNCE_4, SUBSCRIBE_REJECT, SUBSCRIBE_TITLE_1, SUBSCRIBE_TITLE_2 } from "@main/constants/main";
import { Input } from "@shared/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form"
import SubscribeButton from "@main/components/SubscribeButton";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { emailSubscribeSchema } from "@main/schemas";
import { useToast } from "@shared/components/ui/use-toast";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black font-bold text-lg leading-[27px]">
    <div>{SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const form = useForm<z.infer<typeof emailSubscribeSchema>>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof emailSubscribeSchema>) => {
    try {
      emailSubscribeSchema.safeParse(values);
      console.log(values);
      // 폼 제출 성공 로직 추가

      setIsOpen(false)

      toast({
        title: "구독 신청이 완료되었어요!",
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
                          <Input placeholder="이메일을 입력해주세요" {...field} className={`rounded-[10px] ${form.formState.errors.email ? 'border-error' : ''}`} />
                        </FormControl>
                        <FormMessage />
                        <span className="text-[12px] font-semibold text-text-gray2 mt-[11px]">
                          {SUBSCRIBE_ANNOUNCE_1} <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUNCE_2}</a>과 <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUNCE_3}</a>에 {SUBSCRIBE_ANNOUNCE_4}
                        </span>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row w-full space-x-[8px]">
                    <SubscribeButton label={SUBSCRIBE_REJECT} handleClick={() => setIsOpen(false)} variant={"outline"} className={"bg-white text-black font-medium text-[14px] w-1/2"} />
                    <SubscribeButton type="submit" label={SUBSCRIBE_ACCEPT} variant={"outline"} className={"bg-black text-white font-medium text-[14px] w-1/2"} />
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
