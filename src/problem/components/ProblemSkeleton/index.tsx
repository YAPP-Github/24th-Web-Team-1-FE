import { PROBLEM_TITLE_INFO } from "@problem/constants/problemInfo";
import { Skeleton } from "@shared/components/ui/skeleton";

const TitleSkeleton = () => {
  return (
    <header className="mt-[26px] flex flex-col gap-[7px]">
      <h3 className={PROBLEM_TITLE_INFO.NO_ANSWER.className}>
        {PROBLEM_TITLE_INFO.NO_ANSWER.title}
      </h3>
      <Skeleton className="skeleton h-[30px] w-[80%]" />
      <Skeleton className="skeleton h-[30px] w-[60%]" />
    </header>
  );
};
const AnswerChoiceListSkeleton = () => {
  const skeletonItems = new Array(4).fill(null);

  return (
    <section className="mt-[39px] flex flex-col gap-[9px]">
      {skeletonItems.map((_, index) => (
        <Skeleton key={index} className="skeleton h-[50px] w-full" />
      ))}
    </section>
  );
};
const ProblemSkeleton = {
  TitleSkeleton,
  AnswerChoiceListSkeleton,
};
export default ProblemSkeleton;
