import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@shared/components/ui/use-toast";

import { UNSUBSCRIBE_CONFIRM } from "@subscription/constants/unsubscribe";
import { unsubscribeWorkbookOptions } from "@subscription/remotes/postUnsubscriptionQueryOptions";
import { unSubscribeSchema } from "@subscription/schemas";
import { UnsubscribeFormData } from "@subscription/types/subscription";
import { getCookie } from "@subscription/utils";

import { zodResolver } from "@hookform/resolvers/zod";

export const useUnsubscribeForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(function getEmailFromCookie() {
    const userEmail = getCookie('user-email');
    setEmail(userEmail);
  }, []);

  const form = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unSubscribeSchema),
    defaultValues: {
      opinion: "",
    },
    mode: "onSubmit"
  });

  const { mutate: unsubscribeWorkbook } = useMutation(unsubscribeWorkbookOptions(email));

  const onSubmit = (values: UnsubscribeFormData) => {
    try {
      // 폼 제출 성공 로직 추가
      if (typeof email === "string") { // zod parse 가 가능하고, cookie 에 이메일이 존재한다면
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
      toast({
        title: '구독 취소가 되지 않았습니다.'
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
