import { ArticleDetail } from "@article/types";
import { CategoryClientInfo } from "@common/types/category";
import { WorkbookClientInfo } from "@workbook/types";

interface ArticleWithWorkbookInfo {
  id: WorkbookClientInfo["id"];
  title: WorkbookClientInfo["title"];
}
export interface ArticleClientInfo {
  id: number;
  writerInfo: {
    name: string;
    url: string;
    imageUrl: string;
  };
  thumbnail: string;
  isPriorityImage: boolean;
  title: string;
  content: string;
  category: string;
  viewCount: number;
  withWorkbookList: Pick<WorkbookClientInfo, "id" | "title">[] | null;
}

export type ArticleServerInfo = {
  mainImageUrl: string;
  views: number;
  workbooks: ArticleWithWorkbookInfo[];
} & ArticleDetail;

export type ArticlesInfiniteQueryParams = {
  prevArticleId: string;
} & Pick<CategoryClientInfo, "code">;
