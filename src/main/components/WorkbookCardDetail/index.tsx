import { WorkbookClientInfo } from "@main/types/workbook";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";
import Image from "next/image";
import FewLogo from "public/assets/icon/cardFewLogo.svg";

const MainImage = ({
  mainImageUrl,
}: Pick<WorkbookClientInfo, "mainImageUrl">) => (
  <Image
    width={269}
    height={172}
    src={mainImageUrl}
    alt=""
    priority
    className="h-[172px] w-[269px] rounded-t-lg object-cover"
  />
);
const WorkbookDetailInfoWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <article
    className={cn(
      "flex flex-col",
      "rounded-b-lg bg-black",
      "px-[21px] pb-[25px] pt-[23px]",
    )}
  >
    {children}
  </article>
);

const Title = ({ title }: Pick<WorkbookClientInfo, "title">) => (
  <p className="body3-bold w-auto truncate py-[2px] text-white">{title}</p>
);

const WriterList = ({ writers }: Pick<WorkbookClientInfo, "writers">) => (
  <ul className="sub3-medium flex gap-1 pb-[10px] text-text-gray2">
    {writers.map((writer, idx) => (
      <li key={`workbook-writer-${idx}`}>{writer}</li>
    ))}
  </ul>
);

const PersonCourseWithFewLogo = ({
  personCourse,
}: Pick<WorkbookClientInfo, "personCourse">) => (
  <div className="flex justify-between pb-[26px] pt-[10px]">
    <span className="sub3-medium text-text-gray3">{personCourse}</span>
    <FewLogo width={20} height={20} fill="#264932" />
  </div>
);

const BottomButton = ({
  buttonTitle,
}: Pick<WorkbookClientInfo, "buttonTitle">) => (
  <Button
    className={cn(
      "sub3-semibold bg-white text-black",
      "h-fit rounded py-[4.5px]",
    )}
  >
    {buttonTitle}
  </Button>
);
const WorkbookCardDetail = {
  MainImage,
  WorkbookDetailInfoWrapper,
  Title,
  WriterList,
  PersonCourseWithFewLogo,
  BottomButton,
};

export default WorkbookCardDetail;
