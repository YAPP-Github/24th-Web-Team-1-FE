export interface ICurriculumItem {
    id: number
    title: string
}

export interface Writer {
    id: number;
    name: string;
};

export interface Article {
    id: number;
    title: string;
};

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
};
