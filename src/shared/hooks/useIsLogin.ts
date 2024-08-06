"use client";
import { useEffect, useState } from "react";

import { COOKIES } from "@shared/constants/token";
import { getCookie } from "cookies-next";

const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(function checkIsLogin() {
    const accessToken = getCookie(COOKIES.ACCESS_TOKEN);

    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useIsLogin;
