import { ArticleDetail } from "@article/types";
import { CategoryClientInfo } from "@common/types/category";
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
  withWorkbookList: Pick<WorkbookInfo, "id" | "title">[] | null;
}

export type ArticleServerInfo = {
  mainImageUrl: string;
  views: number;
  workbooks: ArticleWithWorkbookInfo[];
} & ArticleDetail;

export type ArticlesInfiniteQueryParams = {
  prevArticleId: string;
} & Pick<CategoryClientInfo, "code">;
