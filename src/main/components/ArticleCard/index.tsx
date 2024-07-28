import { ArticleClientInfo } from "@main/types/article";
import { title } from "process";
import ArticleCardDetail from "../ArticleCardDetail";

export default function ArticleCard({
  writerInfo,
  thumbnail,
  viewCount,
  category,
  content,
  withWorkbookList,
}: ArticleClientInfo) {
  return (
    <section className="border-b-[0.5px] border-text-gray2 px-[20px] py-[26px]">
      <ArticleCardDetail.TopComponentWrapper>
        <ArticleCardDetail.WriterProfile writerInfo={writerInfo} />
        <ArticleCardDetail.ViewCount viewCount={viewCount} />
      </ArticleCardDetail.TopComponentWrapper>
      <ArticleCardDetail.CategoryTag category={category} />
      <ArticleCardDetail.Title title={title} />
      <ArticleCardDetail.Description content={content} />
      <ArticleCardDetail.Thumbnail thumbnail={thumbnail} />
      <ArticleCardDetail.WithWorkbookList withWorkbookList={withWorkbookList} />
    </section>
  );
}
