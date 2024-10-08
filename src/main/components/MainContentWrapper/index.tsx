import { HTMLAttributes } from "react";

import { cn } from "@shared/utils/cn";

interface MainContentWrapperProps extends HTMLAttributes<HTMLDivElement> {}
export default function MainContentWrapper({
  title,
  children,
  className,
}: MainContentWrapperProps) {
  return (
    <section className={cn("ml-[20px]", className)}>
      <header>
        <h2 className="h2-bold">{title}</h2>
      </header>
      {children}
    </section>
  );
}
