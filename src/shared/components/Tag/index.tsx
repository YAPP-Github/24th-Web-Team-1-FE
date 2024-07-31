import { cn } from "@shared/utils/cn";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Tag({ title, className }: Props) {
  return (
    <div
      className={cn(
        "body3-medium h-fit w-fit bg-background1 px-[6px] py-[4px] text-text-gray1",
        className,
      )}
    >
      {title}
    </div>
  );
}
