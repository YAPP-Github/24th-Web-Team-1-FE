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
        workbooks,
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
          withWorkbookList: this.getWithWorkbookList({ workbooks }),
        };
        return changeToClientData;
      },
    );
  }

  getRemoveTagContent({ content }: Pick<ArticleServerInfo, "content">) {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  getWithWorkbookList({ workbooks }: Pick<ArticleServerInfo, "workbooks">) {
    return workbooks.length ? workbooks : null;
  }
  private articleCardServerList: ArticleServerInfo[];
}
