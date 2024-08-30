"use client";
import { useState } from "react";

import { cn } from "@shared/utils/cn";

import FewLogo from "public/assets/icon/fewlogo.svg";
import DropDownMenuWrapper from "../DropdownMenuWrapper";
import { EVENT_NAME } from "@shared/constants/mixpanel";
import useTrackMixpanel from "@shared/hooks/useTrackMixpanel";
export default function MainHeader() {
  useTrackMixpanel({ eventKey: EVENT_NAME.MAIN_APPEAR });
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <header
      className={cn(
        "relative flex h-[66px] w-full items-center justify-between sticky top-0 z-[9999]",
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
