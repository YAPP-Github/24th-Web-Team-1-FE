import { Skeleton } from "@shared/components/ui/skeleton";

export default function WorkbookSkeleton() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <Skeleton className="h-[338px] w-full" />

      {/* Content Skeleton */}
      <div className="w-full mt-[70px]">
        <Skeleton className="h-[30px]" style={{ width: "60%" }}/>
        <Skeleton className="h-[30px]" style={{ width: "80%", marginTop: "9px" }} />
        <Skeleton className="h-[30px] w-full" style={{ marginTop: "9px" }} />
        <Skeleton className="h-[30px] w-full" style={{ marginTop: "9px" }} />
        <Skeleton className="h-[30px] w-full" style={{ marginTop: "9px" }} />
        <Skeleton className="h-[30px] w-full" style={{ marginTop: "9px" }} />
        <Skeleton className="h-[30px] w-full" style={{ marginTop: "9px" }} />
      </div>
    </div>
  );
}
