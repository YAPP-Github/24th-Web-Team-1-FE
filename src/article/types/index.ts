import { ProblemListInfo } from "@problem/types/problemInfo";
import { Article, WorkbookServerInfo, Writer } from "@workbook/types";

export type ArticleDetail = {
  problemIds: ProblemListInfo[];
  content: string;
  writer: WriterInfo;
} & Article &
  Pick<WorkbookServerInfo, "category" | "createdAt">;

export type WriterInfo = { imageUrl: string } & Writer;
export type ArticleWithWorkbookDetail = {
  day: string;
} & ArticleDetail;

export interface ArticlePageProps {
  params: { articleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
