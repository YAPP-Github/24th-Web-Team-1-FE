import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@api/fewFetch";

import { useToast } from "@shared/components/ui/use-toast";

import queryClient from "@api/queryClient";
import { SIGNUP_PROGRESS } from "@auth/constants/auth";
import { QUERY_KEY } from "@auth/remotes/api";
import { memberSaveOptions } from "@auth/remotes/postMembersQueryOption";
import { memberSaveResponse } from "@auth/types/auth";
import { emailSubscribeSchema } from "@common/schemas/emailSchema";
import { EmailSubscribeFormData } from "@common/types/emailSubscribeData";
import { zodResolver } from "@hookform/resolvers/zod";

export const useEmailForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const memberSave = useMutation({
    ...memberSaveOptions(),
  });

  const onSubmitEmail = (values: EmailSubscribeFormData) => {
    router.push(`/auth/validation?email=${values.email}`);

    try {
      memberSave.mutate(values, {
        onSuccess: (response: ApiResponse<memberSaveResponse>) => {
          if (!response.data?.data?.isSendAuth) {
            router.push(`/auth`);
            toast({
              title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL,
            });
          }
          queryClient.resetQueries({
            queryKey: [QUERY_KEY.MEMBERS],
            exact: true,
          });
        },
        onError: () => {
          router.push(`/auth`);
          toast({
            title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL,
          });
        },
      });
    } catch (error) {
      console.error("catch error", error);
      router.push(`/auth`);
      toast({
        title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL,
      });
    }
  };

  return {
    form,
    onSubmitEmail,
  };
};
