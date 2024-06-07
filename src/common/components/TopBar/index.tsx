"use client";

import { useRouter } from "next/router";

import React from "react";

import IcBack from "public/assets/icon25/back_25.svg";

export default function TopBar() {
  const { back } = useRouter();
  return (
    <div className="flex h-[66px] items-center">
      <IcBack onClick={() => back()} />
    </div>
  );
}
