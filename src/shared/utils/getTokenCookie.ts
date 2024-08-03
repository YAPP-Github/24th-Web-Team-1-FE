import { getCookie } from "cookies-next";

export const getTokenCookie = () => {
    const accessTokenFromCookie = getCookie("accessToken")
    if (accessTokenFromCookie) {
        return accessTokenFromCookie
    }

    return undefined
}