import { CategoryClientInfo } from "@common/types/category";
import { ENTIRE_CATEGORY } from "@main/constants";
import { getArticlesWithCategoryInfiniteQueryOptions } from "@main/remotes/getArticlesWithCategoryInfiniteQueryOptions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ArticleCard from "../ArticleCard";
import ArticleCardListSkeleton from "../ArticleCardListSkeleton";
export default function ArticleCardList({ code }: Partial<CategoryClientInfo>) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    ...getArticlesWithCategoryInfiniteQueryOptions({
      code: code !== undefined ? code : ENTIRE_CATEGORY,
    }),
  });
  const { ref, inView } = useInView();

  useEffect(
    function fetchNextArticles() {
      if (inView && !data?.isLast) {
        fetchNextPage();
      }
    },
    [inView],
  );
  if (isLoading || !data?.articles) {
    return <ArticleCardListSkeleton />;
  }

  const lastIdx = data?.articles.length - 1;
  return (
    <section>
      {data?.articles.map((data, idx) => (
        <div key={`article-card-${idx}`}>
          {idx === lastIdx && <div ref={ref} className="h-[2px]" />}
          <ArticleCard {...data} />
        </div>
      ))}
    </section>
  );
}
