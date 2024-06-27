import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { z } from "zod";

import { useToast } from "@shared/components/ui/use-toast";

import { UNSUBSCRIBE_CONFIRM } from "@subscription/constants/unsubscribe";
import { unsubscribeWorkbookOptions } from "@subscription/remotes/postUnsubscriptionQueryOptions";
import { unSubscribeSchema } from "@subscription/schemas";
import { UnsubscribeFormData } from "@subscription/types/subscription";
import { getCookie } from "@subscription/utils";

import { zodResolver } from "@hookform/resolvers/zod";

export const useUnsubscribeForm = () => {
  const { toast } = useToast();

  const form = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unSubscribeSchema),
    defaultValues: {
      opinion: "",
    },
  });

  const { mutate: unsubscribeWorkbook } = useMutation(unsubscribeWorkbookOptions());

  const onSubmit = (values: UnsubscribeFormData) => {
    try {
      const result = unSubscribeSchema.safeParse(values);
      const email = getCookie('user-email');

      // 폼 제출 성공 로직 추가
      if (result.success && typeof email === "string") { // zod parse 가 가능하고, cookie 에 이메일이 존재한다면
        unsubscribeWorkbook(
          { email: decodeURIComponent(email), opinion: values.opinion },
          {
            onSuccess: () => {
              form.reset();
              toast({
                title: UNSUBSCRIBE_CONFIRM,
              });
            },
            onError: (error) => {
              console.error(error);
              toast({
                title: '구독 취소가 되지 않았습니다.'
              });
            },
          },
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          console.error(err.message);
          // 오류 메시지를 UI에 표시하는 로직 추가
        });
      }
    }
  };

  return {
    form,
    onSubmit,
  };
};
