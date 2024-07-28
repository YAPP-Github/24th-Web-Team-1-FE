import { ArticleDetail } from "@article/types";
import { WorkbookInfo } from "@workbook/types";
import { title } from "process";

interface ArticleWithWorkbookInfo {
  id: WorkbookInfo["id"];
  title: WorkbookInfo["title"];
}
export interface ArticleClientInfo {
  writerInfo: {
    name: string;
    url: string;
  };
  thumbnail: string;
  title: string;
  content: string;
  category: string;
  viewCount: number;
  withWorkbookList: Pick<WorkbookInfo, "id" | "title">[];
}

export type ArticleServerInfo = {
  mainImageUrl: string;
  views: number;
  includedWorkbooks: ArticleWithWorkbookInfo[];
} & ArticleDetail;
