export interface CurriculumInfo {
  id: number;
  title: string;
}

export interface Writer {
  id: number;
  name: string;
  url: string;
}

export interface Article {
  id: number;
  title: string;
}

export interface WorkbookServerInfo {
  id: number;
  name: number;
  mainImageUrl: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  writers: Writer[];
  articles: Article[];
}
export type WorkbookClientInfo = WorkbookServerInfo;

export type WorkbookPageProps = {
  params: { id: string };
};
