import { WorkbookClientInfo } from "@main/types/workbook";
import WorkbookCardDetail from "../WorkbookCardDetail";

export default function WorkbookCard({
  mainImageUrl,
  metaComponent,
  title,
  writers,
  personCourse,
  buttonTitle,
}: WorkbookClientInfo) {
  return (
    <div className="flex h-[390px] min-w-[269px] flex-col">
      <WorkbookCardDetail.MainImage mainImageUrl={mainImageUrl} />
      <WorkbookCardDetail.WorkbookDetailInfoWrapper>
        {metaComponent}
        <WorkbookCardDetail.Title title={title} />
        <WorkbookCardDetail.WriterList writers={writers} />
        <WorkbookCardDetail.PersonCourseWithFewLogo
          personCourse={personCourse}
        />
        <WorkbookCardDetail.BottomButton buttonTitle={buttonTitle} />
      </WorkbookCardDetail.WorkbookDetailInfoWrapper>
    </div>
  );
}
