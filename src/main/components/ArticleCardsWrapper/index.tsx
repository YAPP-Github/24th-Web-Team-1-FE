"use client";
import useCategory from "@main/hooks/useCategory";
import dynamic from "next/dynamic";
import ArticleCardListSkeleton from "../ArticleCardListSkeleton";
import CategoryTabSkeleton from "../CategoryTabSkeleton";
import MainContentWrapper from "../MainContentWrapper";

const CategoryTabs = dynamic(() => import("../CategoryTabs"), {
  loading: () => <CategoryTabSkeleton className="ml-[20px]" />,
});
const ArticleCardList = dynamic(() => import("../ArticleCardList"), {
  loading: () => <ArticleCardListSkeleton />,
});

export default function ArticleCardsWrapper() {
  const { category, handleCategory } = useCategory();

  return (
    <MainContentWrapper
      title="Articles"
      className="ml-0 mt-[16px] [&>header]:ml-[20px]"
    >
      <CategoryTabs
        type="ARTICLE"
        handleCategory={handleCategory}
        category={category}
        className="ml-[20px]"
      />
      <ArticleCardList {...category} />
    </MainContentWrapper>
  );
}
