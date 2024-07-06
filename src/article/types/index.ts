import { ProblemListInfo } from "@problem/types/problemInfo";
import { Article, WorkbookInfo, Writer } from "@workbook/types";

export type ArticleDetail = {
  problemIds: ProblemListInfo[];
  content: string;
  writer: Writer;
} & Article &
  Pick<WorkbookInfo, "category" | "createdAt">;

export type ArticleWithWorkbookDetail = {
  day: string;
} & ArticleDetail;
