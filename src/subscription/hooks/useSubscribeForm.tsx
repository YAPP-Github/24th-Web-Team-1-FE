import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { z } from 'zod';

import { useToast } from '@shared/components/ui/use-toast';

import { getWorkbookId } from '@workbook/utils';

import { EMAIL_CONTROL, SUBSCRIBE_USER_ACTIONS } from '@subscription/constants/subscribe';
import { subscribeWorkbookOptions } from '@subscription/remotes/postSubscriptionQueryOptions';
import { emailSubscribeSchema } from '@subscription/schemas';
import { EmailSubscribeFormData } from '@subscription/types/subscription';

import { zodResolver } from '@hookform/resolvers/zod';

export const useSubscribeForm = () => {
  const { toast } = useToast();
  const pathname = usePathname()
  const [workbookId, setWorkbookId] = useState<string>("")

  useEffect(function getId() {
    return setWorkbookId(getWorkbookId(pathname));
  }, [pathname])
  
  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate: subscribeWorkbook } = useMutation(subscribeWorkbookOptions({
    workbookId: workbookId, 
  }));

  const onSubmit = (values: EmailSubscribeFormData) => {
    try {
      emailSubscribeSchema.safeParse(values);

      subscribeWorkbook(values, {
        onSuccess: () => {
          form.reset();
          toast({
            title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_SUCCESS,
          });
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: '구독 신청이 되지 않았습니다.'
          });
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(() => {
          toast({
            title: EMAIL_CONTROL.INVALID_EMAIL,
          });
        });
      }
    }
  };

  return {
    form,
    onSubmit,
  };
};
