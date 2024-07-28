import { ArticleClientInfo, ArticleServerInfo } from "@main/types/article";

export default class ArticleCardModel {
  constructor({
    initArticleCardServerList,
  }: {
    initArticleCardServerList: ArticleServerInfo[];
  }) {
    this.articleCardServerList = initArticleCardServerList;
  }

  articleCardList(): ArticleClientInfo[] {
    return this.articleCardServerList.map(
      ({
        id,
        writer,
        title,
        content,
        category,
        views,
        includedWorkbooks,
        mainImageUrl,
      }) => {
        const changeToClientData: ArticleClientInfo = {
          id,
          writerInfo: {
            name: writer.name,
            url: writer.url,
          },
          thumbnail: mainImageUrl,
          title,
          content,
          category,
          viewCount: views,
          withWorkbookList: includedWorkbooks,
        };
        return changeToClientData;
      },
    );
  }

  private articleCardServerList: ArticleServerInfo[];
}
