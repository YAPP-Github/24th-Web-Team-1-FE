import { Skeleton } from "@shared/components/ui/skeleton";
import SkeletonFewLogo from "public/assets/icon/skeletonFewLogo.svg";
const WriterProfileSkeleton = () => {
  return <Skeleton className="h-[30px] w-[30px] rounded-full" />;
};
const ViewCountSkeleton = () => {
  return (
    <div className="flex items-center gap-[5px]">
      <Skeleton className="h-[9px] w-[40px]" />
    </div>
  );
};
const CategoryTagSkeleton = () => {
  return <Skeleton className="mb-[8px] h-[18px] w-[20%] py-[2px]" />;
};
const TitleSkeleton = () => {
  return <Skeleton className="mb-[4px] h-[27px] w-[30%] bg-text-gray3" />;
};

const DescriptionSkeleton = () => {
  const skeletonItems = new Array(4).fill(null);
  return (
    <div className="mb-[20px] flex flex-col gap-[3px]">
      {skeletonItems.map((_, index) => (
        <Skeleton key={index} className="h-[23px] w-full bg-text-gray3" />
      ))}
    </div>
  );
};

const ThumbnailSkeleton = () => {
  return (
    <Skeleton className="flex h-[170px] w-full items-center justify-center rounded bg-[#C4C4C4]">
      <SkeletonFewLogo width={93} height={93} />
    </Skeleton>
  );
};

const ArticleCardDetailSkeleton = {
  WriterProfileSkeleton,
  ViewCountSkeleton,
  CategoryTagSkeleton,
  TitleSkeleton,
  DescriptionSkeleton,
  ThumbnailSkeleton,
};
export default ArticleCardDetailSkeleton;
