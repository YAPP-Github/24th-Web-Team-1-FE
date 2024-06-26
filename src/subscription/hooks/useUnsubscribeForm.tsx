import { useForm } from "react-hook-form";

import { z } from "zod";

import { useToast } from "@shared/components/ui/use-toast";

import { UNSUBSCRIBE_CONFIRM } from "@subscription/constants/unsubscribe";
import { unSubscribeSchema } from "@subscription/schemas";
import { UnsubscribeFormData } from "@subscription/types/subscription";

import { zodResolver } from "@hookform/resolvers/zod";

export const useUnsubscribeForm = () => {
  const { toast } = useToast();

  const form = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unSubscribeSchema),
    defaultValues: {
      opinion: "",
    },
  });

  const onSubmit = (values: UnsubscribeFormData) => {
    try {
      const result = unSubscribeSchema.safeParse(values);
      
      // 폼 제출 성공 로직 추가
      if (result.success) {
        form.reset();
        toast({
          title: UNSUBSCRIBE_CONFIRM,
        });
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
