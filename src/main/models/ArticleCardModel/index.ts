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
          content: this.getRemoveTagContent({ content }),
          category,
          viewCount: views,
          withWorkbookList: includedWorkbooks,
        };
        return changeToClientData;
      },
    );
  }

  getRemoveTagContent({ content }: Pick<ArticleServerInfo, "content">) {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  private articleCardServerList: ArticleServerInfo[];
}
