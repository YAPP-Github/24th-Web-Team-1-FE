import { ArticleDetail } from "@article/types";
import { WorkbookInfo } from "@workbook/types";

interface ArticleWithWorkbookInfo {
  id: WorkbookInfo["id"];
  title: WorkbookInfo["title"];
}
export interface ArticleClientInfo {
  id: number;
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
