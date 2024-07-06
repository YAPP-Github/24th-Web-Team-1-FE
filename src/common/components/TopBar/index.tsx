"use client";

import { useRouter } from "next/navigation";

import React, { HTMLAttributes } from "react";

import IcBack from "public/assets/icon25/back_25.svg";

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {}
export default function TopBar({ onClick }: TopBarProps) {
  const { back } = useRouter();

  const onClickBackIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    else back()
  };

  return (
    <div className="flex h-[66px] items-center" onClick={onClickBackIcon} data-testid="back-icon">
      <IcBack />
    </div>
  );
}
