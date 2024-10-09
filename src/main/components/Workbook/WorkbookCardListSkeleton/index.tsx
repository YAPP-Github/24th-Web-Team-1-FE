import { Skeleton } from "@shared/components/ui/skeleton";
import SkeletonFewLogo from "public/assets/icon/skeletonFewLogo.svg";

const WorkbookCardSkeleton = () => {
  return (
    <Skeleton className="flex min-h-[390px] min-w-[269px] items-center justify-center">
      <SkeletonFewLogo height={136} width={136} />
    </Skeleton>
  );
};
export default function WorkbookCardListSkeleton() {
  return (
    <section className="mr-[18px] flex gap-[8px] overflow-x-auto">
      {new Array(2).fill(0).map((_, idx) => (
        <WorkbookCardSkeleton key={`workbook-card-skeleton-${idx}`} />
      ))}
    </section>
  );
}
