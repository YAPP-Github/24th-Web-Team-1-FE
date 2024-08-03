import ArticleCardDetail from "../ArticleCardDetail";
import ArticleCardDetailSkeleton from "../ArticleCardDetailSkeleton";

export default function ArticleCardListSkeleton() {
  return (
    <>
      {new Array(2).fill(null).map((_, idx) => (
        <ArticleCardDetail.RootComponentWrapper
          key={`article-card-skeleton-${idx}`}
        >
          <ArticleCardDetail.TopComponentWrapper>
            <ArticleCardDetailSkeleton.WriterProfileSkeleton />
            <ArticleCardDetailSkeleton.ViewCountSkeleton />
          </ArticleCardDetail.TopComponentWrapper>
          <ArticleCardDetailSkeleton.CategoryTagSkeleton />
          <ArticleCardDetailSkeleton.TitleSkeleton />
          <ArticleCardDetailSkeleton.DescriptionSkeleton />
          <ArticleCardDetailSkeleton.ThumbnailSkeleton />
        </ArticleCardDetail.RootComponentWrapper>
      ))}
    </>
  );
}
