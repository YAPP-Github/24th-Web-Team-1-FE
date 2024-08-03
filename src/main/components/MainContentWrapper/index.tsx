import { cn } from "@shared/utils/cn";
import { HTMLAttributes } from "react";

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
