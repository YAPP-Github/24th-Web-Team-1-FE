import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Tag({ title }: Props) {
  return (
    <div className="body3-medium h-fit w-fit bg-background1 px-[6px] py-[4px]">
      {title}
    </div>
  );
}
