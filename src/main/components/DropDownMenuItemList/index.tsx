"use client";
import { getCookie } from "cookies-next";

import { COOKIES } from "@shared/constants/token";
import useIsLogin from "@shared/hooks/useIsLogin";
import { cn } from "@shared/utils/cn";
import { tokenParse } from "@shared/utils/tokenParse";

import { AUTH_LINK, UNAUTH_LINK } from "@main/constants/dropdownMenu";
import { EVENT_NAME } from "@shared/constants/mixpanel";
import useTrackMixpanel from "@shared/hooks/useTrackMixpanel";

export function DropDownMenuItemList() {
  useTrackMixpanel({ eventKey: EVENT_NAME.MYPAGE_APPEAR });

  const isLogin = useIsLogin();
  const token =
    isLogin && tokenParse(getCookie(COOKIES.ACCESS_TOKEN as string) || "");

  const MENU_ITEM_LIST = isLogin ? AUTH_LINK : UNAUTH_LINK;
  const lastIdx = MENU_ITEM_LIST.length - 1;
  return (
    <ul className="absolute left-0 top-[66px] z-10 h-[calc(100vh-66px)] w-full overflow-y-auto bg-white">
      {MENU_ITEM_LIST.map(({ title, component }, idx) => (
        <li
          key={`link-to-${idx}`}
          className={cn(
            "flex flex-col justify-center",
            "sub2-bold min-h-[66px] w-full px-[20px] py-[10px]",
            title === "구독 토글 리스트" && "p-0",
            title === "구독 관리 제목" && "p-0",
            lastIdx !== idx && "border-b-[0.5px] border-text-gray3",
          )}
        >
          {component({ title, email: token ? token.memberEmail : undefined })}
        </li>
      ))}
    </ul>
  );
}
