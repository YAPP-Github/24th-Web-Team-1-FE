import { Skeleton } from "@shared/components/ui/skeleton";

const ImageSkeleton = () => {
  return <Skeleton className="min-h-[420px] w-full" />;
};
const TitleSkeleton = () => {
  return (
    <div className="mt-[70px] flex w-full flex-col gap-3 px-[16px]">
      <Skeleton className="h-[30px] w-[60%]" />
      <Skeleton className="mt-[9px] h-[70px] w-[80%]" />
      <Skeleton className="h-[28px] w-[40%]" />
    </div>
  );
};

const OverviewSectionSkeleton = () => {
  return (
    <div className="mt-[70px] flex w-full flex-col gap-[3px] px-[16px]">
      <Skeleton className="h-[24px] w-[26px]" />
      <Skeleton className="h-[57px] w-full" />
    </div>
  );
};

const ContentWrapperkeleton = () => {
  const skeletonItems = new Array(6).fill(null);

  return (
    <div className="mt-[70px] w-full px-[16px]">
      {skeletonItems.map((_, index) => (
        <Skeleton key={index} className="mt-[9px] h-[30px] w-full" />
      ))}
    </div>
  );
};

const WorkbookSkeleton = {
  ImageSkeleton,
  TitleSkeleton,
  OverviewSectionSkeleton,
  ContentWrapperkeleton,
};
export default WorkbookSkeleton;
