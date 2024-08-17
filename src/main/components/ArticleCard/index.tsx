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
  isPriorityImage,
  title,
  content,
  withWorkbookList,
}: ArticleClientInfo) {
  const { push } = useRouter();
  const onClickArticlePage = () => {
    push(`/article/${id}`);
  };
  return (
    <section className="border-b-[0.5px] border-text-gray2 px-[20px] py-[26px]">
      <ArticleCardDetail.TopComponentWrapper>
        <ArticleCardDetail.WriterProfile
          writerInfo={writerInfo}
          isPriorityImage={isPriorityImage}
        />
        <ArticleCardDetail.ViewCount viewCount={viewCount} />
      </ArticleCardDetail.TopComponentWrapper>
      <ArticleCardDetail.CategoryTag category={category} />
      <article onClick={onClickArticlePage}>
        <ArticleCardDetail.Title title={title} />
        <ArticleCardDetail.Description content={content} />
        <ArticleCardDetail.Thumbnail
          thumbnail={thumbnail}
          isPriorityImage={isPriorityImage}
        />
        <ArticleCardDetail.WithWorkbookList
          withWorkbookList={withWorkbookList}
        />
      </article>
    </section>
  );
}
