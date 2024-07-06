import { Skeleton } from "@shared/components/ui/skeleton";

import ContentSkeleton from "@common/components/ContentSkeleton";

export default function WorkbookSkeleton() {
  const skeletonItems = new Array(6).fill(null);

  return (
    <div className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <Skeleton className="h-[338px] w-full" />

      {/* Content Skeleton */}
      <div className="mt-[70px] w-full px-[16px]">
        <ContentSkeleton className="h-[30px]" style={{ width: "60%" }} />
        <ContentSkeleton
          className="h-[30px]"
          style={{ width: "80%", marginTop: "9px" }}
        />
        {skeletonItems.map((_, index) => (
          <ContentSkeleton
            key={index}
            className="h-[30px] w-full"
            style={{ marginTop: "9px" }}
          />
        ))}
      </div>
    </div>
  );
}
