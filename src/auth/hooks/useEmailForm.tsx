import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { ApiResponse, FewResponse } from "@api/fewFetch";

import { useToast } from "@shared/components/ui/use-toast";

import { LOGIN_STATUS, SIGNUP_PROGRESS } from "@auth/constants/auth";
import { memberSaveOptions } from "@auth/remotes/postMembersQueryOption";
import { memberSaveResponse } from "@auth/types/auth";
import { emailSubscribeSchema } from "@common/schemas/emailSchema";
import { EmailSubscribeFormData } from "@common/types/emailSubscribeData";
import { zodResolver } from "@hookform/resolvers/zod";

export const useEmailForm = () => {
  const { toast } = useToast();
  const router = useRouter()

  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const { mutate: memberSave } = useMutation({
    ...memberSaveOptions()
  });

  const onSubmit = (values: EmailSubscribeFormData) => {
    try {
      memberSave(values, {
        onSuccess: (response: ApiResponse<memberSaveResponse>) => {
          console.log('res', response.data?.data);

          if (response.data?.data?.isSendAuth) {
            // redirect to validation page
            router.push(`/auth/validation?email=${values.email}`)
          } else {
            toast({
              title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL,
            });
          }
        },
        onError: () => {  
          toast({
            title: SIGNUP_PROGRESS.EMAIL_SEND_FAIL,
          });
        },
      });
    } catch (error) {
      console.error("catch error", error);

      toast({
        title: LOGIN_STATUS.FAILED,
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
