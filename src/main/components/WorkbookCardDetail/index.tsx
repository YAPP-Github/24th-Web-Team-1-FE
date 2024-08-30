import { WorkbookCardClientInfo } from "@main/types/workbook";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";
import Image from "next/image";
import FewLogo from "public/assets/icon/cardFewLogo.svg";

const ImageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <div className="relative">{children}</div>;

const MainImage = ({
  mainImageUrl,
  isPriorityImage,
}: Pick<WorkbookCardClientInfo, "mainImageUrl" | "isPriorityImage">) => (
  <Image
    width={269}
    height={172}
    src={mainImageUrl}
    alt="main-image"
    priority={isPriorityImage}
    quality={90}
    sizes="28vw"
    className="h-[172px] w-[269px] rounded-t-lg object-cover"
  />
);

const CardBadge = ({
  badgeInfo,
}: Pick<WorkbookCardClientInfo, "badgeInfo">) => (
  <div
    className={cn(
      "absolute left-[13px] top-[14px] w-fit",
      "px-[6.3px] py-[3.4px]",
      "rounded-[3.2px] text-[10px]/[15px] font-extrabold",
      badgeInfo.className,
    )}
  >
    {badgeInfo.title}
  </div>
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
      "h-[210px]"
    )}
  >
    {children}
  </article>
);

const Title = ({ title }: Pick<WorkbookCardClientInfo, "title">) => (
  <p className="body3-bold w-auto truncate py-[2px] text-white">{title}</p>
);

const WriterList = ({ writers }: Pick<WorkbookCardClientInfo, "writers">) => (
  <ul className="sub3-medium flex gap-1 pb-[10px] text-text-gray2">
    {writers.map((writer, idx) => (
      <li key={`workbook-writer-${idx}`}>{writer}</li>
    ))}
  </ul>
);

const PersonCourseWithFewLogo = ({
  personCourse,
}: Pick<WorkbookCardClientInfo, "personCourse">) => (
  <div className="flex justify-between pb-[26px] pt-[10px]">
    <span className="sub3-medium text-text-gray3">{personCourse}</span>
    <FewLogo width={20} height={20} fill="#264932" />
  </div>
);

const BottomButton = ({
  buttonTitle,
  handleClickBottomButton,
}: Pick<WorkbookCardClientInfo, "buttonTitle"> & {
  handleClickBottomButton: () => void;
}) => (
  <Button
    className={cn(
      "sub3-semibold bg-white text-black",
      "h-fit rounded py-[4.5px]",
      "hover:bg-white",
      "focus:bg-white",
    )}
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleClickBottomButton();
    }}
  >
    {buttonTitle}
  </Button>
);
const WorkbookCardDetail = {
  ImageWrapper,
  MainImage,
  WorkbookDetailInfoWrapper,
  Title,
  WriterList,
  PersonCourseWithFewLogo,
  BottomButton,
  CardBadge,
};

export default WorkbookCardDetail;
