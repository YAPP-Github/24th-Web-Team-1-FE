"use client";
import { useState } from "react";

import { EVENT_NAME } from "@shared/constants/mixpanel";
import useTrackMixpanel from "@shared/hooks/useTrackMixpanel";
import { cn } from "@shared/utils/cn";

import DropDownMenuWrapper from "../DropdownMenuWrapper";
import FewLogo from "public/assets/icon/fewlogo.svg";
export default function MainHeader() {
  useTrackMixpanel({ eventKey: EVENT_NAME.MAIN_APPEAR });
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <header
      className={cn(
        "relative flex h-[66px] w-full items-center justify-between",
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
