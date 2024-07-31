"use client";
import useCategory from "@main/hooks/useCategory";
import ArticleCardList from "../ArticleCardList";
import CategoryTabs from "../CategoryTabs";
import MainContentWrapper from "../MainContentWrapper";

export default function ArticleCardsWrapper() {
  const { category, handleCategory } = useCategory();

  return (
    <MainContentWrapper title="Articles" className="m-[0]">
      <CategoryTabs
        type="ARTICLE"
        handleCategory={handleCategory}
        category={category}
        className="ml-[20px]"
      />
      {category && <ArticleCardList {...category} />}
    </MainContentWrapper>
  );
}
