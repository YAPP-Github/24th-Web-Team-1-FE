import { useEffect, useState } from 'react';

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(function checkLogin () {
    const check = () => {
      if (typeof document !== 'undefined') { // 클라이언트 환경에서만 실행
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];

        if (accessToken) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      }
    };

    check();
  }, []);

  return isLogin;
};
