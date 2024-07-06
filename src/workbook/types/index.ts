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

export interface WorkbookInfo {
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

export type MetadataProps = {
  params: { id: string };
};