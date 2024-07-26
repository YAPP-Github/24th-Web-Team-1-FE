"use client";
import useCategory from "@main/hooks/useCategory";
import CategoryTabs from "../CategoryTabs";
import MainContentWrapper from "../MainContentWrapper";

export default function WorkbookCardsWrapper() {
  const { category, handleCategory } = useCategory();

  return (
    <MainContentWrapper title="Workbooks" className="mt-[48px]">
      <CategoryTabs
        type="WORKBOOK"
        handleCategory={handleCategory}
        category={category}
      />
    </MainContentWrapper>
  );
}
