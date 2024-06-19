import { ProblemListInfo } from "@common/types/problemListContextInfo";
import { Article, WorkbookInfo, Writer } from "@workbook/types";

type ArticleDetail = {
  problemIds: ProblemListInfo[];
  content: string;
} & Article &
  Pick<WorkbookInfo, "category" | "createdAt">;

export type ArticleDetailInput = {
  writer: Writer;
} & ArticleDetail;

export type ArticleDetailOutput = {
  writers: Writer[];
} & ArticleDetail;
