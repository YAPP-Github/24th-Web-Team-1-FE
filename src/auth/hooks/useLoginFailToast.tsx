import { useEffect } from "react";

import { deleteCookie,getCookie } from "cookies-next";

import { useToast } from "@shared/components/ui/use-toast";
import { ISLOGIN } from "@shared/constants/token";

import { SIGNUP_FAILED } from "@auth/constants/auth";

export function useLoginFailToast() {
  const { toast } = useToast();
  const isLoginFailed = getCookie(ISLOGIN);

  useEffect(() => {
    if (isLoginFailed === "false") {
      toast({
        title: SIGNUP_FAILED,
      });

      deleteCookie(ISLOGIN);

    }
  }, [isLoginFailed, toast]);
}
