import { ArticleClientInfo } from "@main/types/article";
import Tag from "@shared/components/Tag";
import { cn } from "@shared/utils/cn";
import Image from "next/image";
import Link from "next/link";
import EyeIcon from "public/assets/icon/eye.svg";
import { ReactNode } from "react";

const RootComponentWrapper = ({ children }: { children: ReactNode }) => (
  <section className="border-b-[0.5px] border-text-gray2 px-[20px] py-[26px]">
    {children}
  </section>
);
const TopComponentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-between pb-[6px]">{children}</div>
);
const WriterProfile = ({
  writerInfo,
  isPriorityImage,
}: Pick<ArticleClientInfo, "writerInfo" | "isPriorityImage">) => (
  <div className="flex items-center gap-[10px]">
    <Image
      width={30}
      height={30}
      src={writerInfo.imageUrl}
      sizes="5vw"
      alt="profile-image"
      className="h-[30px] w-[30px] rounded-full"
    />
    <Link className="sub2-bold" href={writerInfo.url}>
      {writerInfo.name}
    </Link>
  </div>
);
const ViewCount = ({ viewCount }: Pick<ArticleClientInfo, "viewCount">) => (
  <div className="flex items-center gap-[5px]">
    <EyeIcon width={13} height={9} />
    <p className="sub3-medium text-text-gray2">{viewCount}</p>
  </div>
);

const CategoryTag = ({ category }: Pick<ArticleClientInfo, "category">) => (
  <Tag title={category} className="sub3-medium mb-[8px] py-[2px]" />
);

const Title = ({ title }: Pick<ArticleClientInfo, "title">) => (
  <header className="mb-[4px]">
    <h3 className="h3-bold text-text-gary1 line-clamp-1 text-ellipsis">
      {title}
    </h3>
  </header>
);
const Description = ({ content }: Pick<ArticleClientInfo, "content">) => (
  <p className="body2-medium mb-[20px] line-clamp-4 text-text-gray1">
    {content}
  </p>
);

const Thumbnail = ({
  thumbnail,
  isPriorityImage,
}: Pick<ArticleClientInfo, "thumbnail" | "isPriorityImage">) => (
  <Image
    width={100}
    height={170}
    src={thumbnail}
    priority={isPriorityImage}
    sizes="80vw"
    alt="article-thumbnail"
    className="h-[170px] w-full rounded object-cover"
  />
);

const WithWorkbookList = ({
  withWorkbookList,
}: Pick<ArticleClientInfo, "withWorkbookList">) => (
  <>
    {withWorkbookList && (
      <footer className="grid grid-cols-[130px_1fr] items-center py-[14px]">
        <span className="sub3-medium text-text-gray1">
          이 아티클이 포함된 학습지
        </span>
        <ul className="flex justify-end gap-[4px]">
          {withWorkbookList.map(({ id, title }) => (
            <li
              key={`with-workbook-${id}`}
              className={cn(
                "sub3-semibold bg-background1 px-[5px] py-[2px] text-text-gray1",
                "line-clamp-1 rounded border-[0.5px] border-text-gray2",
              )}
            >
              <Link href={`/workbook/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </footer>
    )}
  </>
);

const ArticleCardDetail = {
  RootComponentWrapper,
  TopComponentWrapper,
  WriterProfile,
  ViewCount,
  CategoryTag,
  Title,
  Description,
  Thumbnail,
  WithWorkbookList,
};

export default ArticleCardDetail;
