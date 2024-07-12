import { usePathname } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import axios from 'axios';

import { useToast } from '@shared/components/ui/use-toast';
import useWorkbookId from '@shared/hooks/useWorkbookId';

import { SUBSCRIBE_USER_ACTIONS } from '@subscription/constants/subscribe';
import { subscribeWorkbookOptions } from '@subscription/remotes/postSubscriptionQueryOptions';
import { emailSubscribeSchema } from '@subscription/schemas';
import { EmailSubscribeFormData } from '@subscription/types/subscription';

import { zodResolver } from '@hookform/resolvers/zod';

export const useSubscribeForm = () => {
  const { toast } = useToast();
  const pathname = usePathname()
  const workbookId = useWorkbookId(pathname)
  
  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: '',
    },
    mode: "onSubmit"
  });

  const { mutate: subscribeWorkbook } = useMutation(subscribeWorkbookOptions({
    workbookId: workbookId, 
  }));

  const onSubmit = (values: EmailSubscribeFormData) => {
    console.log(workbookId);
    
    try {
      subscribeWorkbook(values, {
        onSuccess: () => {
          form.reset();
          toast({
            title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_SUCCESS,
          });
        },
        onError: (error) => {
          let errorMessage = SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_FAIL;
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || errorMessage;
          }
          toast({
            title: errorMessage,
          });
        },
      });
    } catch (error) {
      console.error('catch error', error);
      
      toast({
        title: SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_FAIL
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
