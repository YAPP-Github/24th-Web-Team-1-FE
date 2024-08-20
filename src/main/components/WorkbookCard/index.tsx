"use client";
import useWorkbookCardBottomButtonEvent from "@main/hooks/useWorkbookCardBottomButtonEvent";
import { WorkbookCardClientInfo } from "@main/types/workbook";
import { useRouter } from "next/navigation";
import WorkbookCardDetail from "../WorkbookCardDetail";

export default function WorkbookCard({
  id,
  badgeInfo,
  mainImageUrl,
  isPriorityImage,
  metaComponent,
  title,
  writers,
  personCourse,
  buttonTitle,
  cardType,
  articleId,
}: WorkbookCardClientInfo) {
  const { push } = useRouter();
  const { handleButtonClick } = useWorkbookCardBottomButtonEvent({
    cardType,
    id,
    articleId,
  });

  return (
    <div
      className="flex h-[390px] min-w-[269px] flex-col"
      onClick={() => push(`/workbook/${id}`)}
    >
      <WorkbookCardDetail.ImageWrapper>
        <WorkbookCardDetail.MainImage
          mainImageUrl={mainImageUrl}
          isPriorityImage={isPriorityImage}
        />
        {badgeInfo.title && (
          <WorkbookCardDetail.CardBadge badgeInfo={badgeInfo} />
        )}
      </WorkbookCardDetail.ImageWrapper>
      <WorkbookCardDetail.WorkbookDetailInfoWrapper>
        {metaComponent}
        <WorkbookCardDetail.Title title={title} />
        <WorkbookCardDetail.WriterList writers={writers} />
        <WorkbookCardDetail.PersonCourseWithFewLogo
          personCourse={personCourse}
        />
        <WorkbookCardDetail.BottomButton
          buttonTitle={buttonTitle}
          handleClickBottomButton={handleButtonClick}
        />
      </WorkbookCardDetail.WorkbookDetailInfoWrapper>
    </div>
  );
}
