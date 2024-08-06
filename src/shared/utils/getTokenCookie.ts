import { COOKIES } from "@shared/constants/token";
import { getCookie } from "cookies-next";

export const getTokenCookie = () => {
  const accessTokenFromCookie = getCookie(COOKIES.ACCESS_TOKEN);
  if (accessTokenFromCookie) {
    return accessTokenFromCookie;
  }

  return undefined;
};
