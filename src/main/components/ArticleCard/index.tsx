"use client";
import { ArticleClientInfo } from "@main/types/article";
import { useRouter } from "next/navigation";
import ArticleCardDetail from "../ArticleCardDetail";

export default function ArticleCard({
  id,
  writerInfo,
  thumbnail,
  viewCount,
  category,
  title,
  content,
}: ArticleClientInfo) {
  const { push } = useRouter();
  const onClickArticlePage = () => {
    push(`/article/${id}`);
  };
  return (
    <section className="border-b-[0.5px] border-text-gray2 px-[20px] py-[26px]">
      <ArticleCardDetail.TopComponentWrapper>
        <ArticleCardDetail.WriterProfile writerInfo={writerInfo} />
        <ArticleCardDetail.ViewCount viewCount={viewCount} />
      </ArticleCardDetail.TopComponentWrapper>
      <ArticleCardDetail.CategoryTag category={category} />
      <article onClick={onClickArticlePage}>
        <ArticleCardDetail.Title title={title} />
        <ArticleCardDetail.Description content={content} />
        <ArticleCardDetail.Thumbnail thumbnail={thumbnail} />
      </article>
    </section>
  );
}
