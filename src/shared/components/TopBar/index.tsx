"use client";

import { useRouter } from "next/navigation";

import React, { HTMLAttributes } from "react";

import IcBack from "public/assets/icon25/back_25.svg";
import { cn } from "@shared/utils/cn";

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {}
export default function TopBar({ onClick, className }: TopBarProps) {
  const { back } = useRouter();

  const onClickBackIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    else back();
  };

  return (
    <div
      className={cn(
        "relative sticky top-0 flex h-[66px] items-center bg-white",
        className,
      )}
      onClick={onClickBackIcon}
      data-testid="back-icon"
    >
      <IcBack />
    </div>
  );
}
