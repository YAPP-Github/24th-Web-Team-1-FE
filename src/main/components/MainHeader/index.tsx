"use client";
import { cn } from "@shared/utils/cn";
import FewLogo from "public/assets/icon/fewlogo.svg";

import { useState } from "react";
import DropDownMenuWrapper from "../DropdownMenuWrapper";
export default function MainHeader() {
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
