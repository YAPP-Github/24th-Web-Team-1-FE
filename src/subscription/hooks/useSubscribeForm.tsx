import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { useToast } from '@shared/components/ui/use-toast';

import { SUBSCRIBE_USER_ACTIONS } from '@subscription/constants/main';
import { emailSubscribeSchema } from '@subscription/schemas';
import { EmailSubscribeFormData } from '@subscription/types/subscription';

import { zodResolver } from '@hookform/resolvers/zod';

export const useSubscribeForm = () => {
  const { toast } = useToast();

  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: EmailSubscribeFormData) => {
    try {
      emailSubscribeSchema.safeParse(values);
      console.log(values);
      // 폼 제출 성공 로직 추가
      form.reset()
      toast({
        title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_SUCCESS,
      });
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
