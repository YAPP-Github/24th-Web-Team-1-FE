import { Skeleton } from "@shared/components/ui/skeleton";
import { cn } from "@shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

const TabsListSkeleton = ({
  children,
  className,
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex gap-3 py-[10px]", className)}>{children}</div>
  );
};
const TabBoxSkeleton = () => {
  return <Skeleton className="h-[40px] w-[48px]" />;
};
const CategorySkeleton = {
  TabBoxSkeleton,
  TabsListSkeleton,
};

export default function CategoryTabSkeleton({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <CategorySkeleton.TabsListSkeleton className={className}>
      {new Array(6).fill(null).map((_, idx) => (
        <CategorySkeleton.TabBoxSkeleton key={`tab-list-skeleton-${idx}`} />
      ))}
    </CategorySkeleton.TabsListSkeleton>
  );
}
