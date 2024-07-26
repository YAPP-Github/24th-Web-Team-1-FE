"use client";
import useCategory from "@main/hooks/useCategory";
import CategoryTabs from "../CategoryTabs";
import MainContentWrapper from "../MainContentWrapper";

export default function WorkbookCardsWrapper() {
  const { category, handleCategory } = useCategory();

  return (
    <MainContentWrapper title="Workboks" className="mb-[73px] mt-[48px]">
      <CategoryTabs
        type="WORKBOOK"
        handleCategory={handleCategory}
        category={category}
      />
    </MainContentWrapper>
  );
}
