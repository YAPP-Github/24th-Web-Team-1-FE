"use client";
import { useState } from "react";

import { cn } from "@shared/utils/cn";

import DropDownMenuWrapper from "../DropdownMenuWrapper";

import FewLogo from "public/assets/icon/fewlogo.svg";
import { EVENT_NAME } from "@shared/constants/mixpanel";
import useTrackMixpanel from "@shared/hooks/useTrackMixpanel";

import { Mixpanel } from "@shared/utils/mixpanel";

export default function MainHeader() {
  useTrackMixpanel({ eventKey: EVENT_NAME.MAIN_APPEAR });
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);


    if (!toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    Mixpanel.track({
      name: EVENT_NAME.MAIN_MYPAGE_TAPPED,
    });

  };

  return (
    <header
      className={cn(
        "fixed top-0 z-[49] flex h-[66px] w-full items-center justify-between",
        toggleMenu ? "bg-white" : "bg-main",
      )}
    >
      <FewLogo width={32} height={32} className="ml-[17px]" />
      <DropDownMenuWrapper
        toggleMenu={toggleMenu}
        handleToggleMenu={handleToggleMenu}
      />
    </header>
  );
}
