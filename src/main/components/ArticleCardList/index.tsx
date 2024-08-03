import { CategoryClientInfo } from "@common/types/category";
import { getArticlesWithCategoryInfiniteQueryOptions } from "@main/remotes/getArticlesWithCategoryInfiniteQueryOptions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ArticleCard from "../ArticleCard";
import ArticleCardListSkeleton from "../ArticleCardListSkeleton";
export default function ArticleCardList({ code }: Partial<CategoryClientInfo>) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    ...getArticlesWithCategoryInfiniteQueryOptions({
      code: code || -1,
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
        <>
          {idx === lastIdx && (
            <div ref={ref} className="h-[2px]" key={`ref-${idx}`} />
          )}
          <ArticleCard {...data} key={`article-card-${idx}`} />
        </>
      ))}
    </section>
  );
}
