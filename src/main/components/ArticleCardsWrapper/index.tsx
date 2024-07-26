"use client";
import useCategory from "@main/hooks/useCategory";
import CategoryTabs from "../CategoryTabs";
import MainContentWrapper from "../MainContentWrapper";

export default function ArticleCardsWrapper() {
  const { category, handleCategory } = useCategory();

  return (
    <MainContentWrapper title="Articles">
      <CategoryTabs
        type="ARTICLE"
        handleCategory={handleCategory}
        category={category}
      />
    </MainContentWrapper>
  );
}