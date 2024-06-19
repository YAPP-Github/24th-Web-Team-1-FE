import { ProblemListInfo } from "@common/types/problemListContextInfo";
import { Article, WorkbookInfo, Writer } from "@workbook/types";

export type ArticleDetail = {
  problemIds: ProblemListInfo[];
  content: string;
  writer: Writer;
} & Article &
  Pick<WorkbookInfo, "category" | "createdAt">;
