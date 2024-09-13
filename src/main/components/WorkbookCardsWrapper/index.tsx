"use client";
import useCategory from "@main/hooks/useCategory";
import dynamic from "next/dynamic";
import CategoryTabSkeleton from "../CategoryTabSkeleton";
import MainContentWrapper from "../MainContentWrapper";
import WorkbookCardListSkeleton from "../WorkbookCardListSkeleton";

const CategoryTabs = dynamic(() => import("../CategoryTabs"), {
  loading: () => <CategoryTabSkeleton />,
});
const WorkbookCardList = dynamic(() => import("../WorkbookCardList"), {
  loading: () => <WorkbookCardListSkeleton />,
});
export default function WorkbookCardsWrapper() {
  const { category, handleCategory } = useCategory();
  return (
    <MainContentWrapper title="Workbooks" className="mb-[73px] mt-[78px]">
      <CategoryTabs
        type="WORKBOOK"
        handleCategory={handleCategory}
        category={category}
        className="ml-0"
      />
      <WorkbookCardList {...category} />
    </MainContentWrapper>
  );
}
