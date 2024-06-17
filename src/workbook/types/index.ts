import { z } from "zod";

import { unSubscribeSchema } from "@workbook/schemas";

export interface CurriculumInfo {
  id: number;
  title: string;
}

export interface Writer {
  id: number;
  name: string;
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
  writerIds: Writer[];
  articles: Article[];
}

export type UnsubscribeFormData = z.infer<typeof unSubscribeSchema>;
