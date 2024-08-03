"use client";
import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";

const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(function checkIsLogin() {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useIsLogin;
