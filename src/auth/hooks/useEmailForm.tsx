import { useForm } from "react-hook-form";

import { useToast } from "@shared/components/ui/use-toast";

import { LOGIN_STATUS } from "@auth/constants/auth";
import { emailSubscribeSchema } from "@common/schemas/emailSchema";
import { EmailSubscribeFormData } from "@common/types/emailSubscribeData";
import { zodResolver } from "@hookform/resolvers/zod";

export const useEmailForm = () => {
  const { toast } = useToast();

  const form = useForm<EmailSubscribeFormData>({
    resolver: zodResolver(emailSubscribeSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: EmailSubscribeFormData) => {
    try {
      console.log(values);

      toast({
        title: LOGIN_STATUS.COMPLETED,
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
