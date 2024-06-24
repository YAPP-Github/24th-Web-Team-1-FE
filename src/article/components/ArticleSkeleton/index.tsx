import { Skeleton } from "@shared/components/ui/skeleton";

const TitleSkeleton = () => {
  return (
    <header className="mt-[20px] flex flex-col gap-[12px]">
      <Skeleton className="h-[40px] w-[80%]" />
      <Skeleton className="h-[40px] w-[60%]" />
      <section className="mt-[2px]">
        <Skeleton className="h-[30px] w-[40%]" />
      </section>
    </header>
  );
};
const EmailContentTemplateSkeleton = () => {
  const skeletonItems = new Array(5).fill(null);

  return (
    <section className="mt-[20px] flex flex-col gap-[9px]">
      {skeletonItems.map((_, index) => (
        <Skeleton key={index} className="h-[40px] w-full" />
      ))}
    </section>
  );
};
const ArticleSkeleton = {
  TitleSkeleton,
  EmailContentTemplateSkeleton,
};
export default ArticleSkeleton;
