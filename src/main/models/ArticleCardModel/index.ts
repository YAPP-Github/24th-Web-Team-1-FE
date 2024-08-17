import { ArticleClientInfo, ArticleServerInfo } from "@main/types/article";
import { ImageModel } from "@shared/models/ImageModel";

export default class ArticleCardModel {
  constructor({
    initArticleCardServerList,
    initIsWebpBrowser,
  }: {
    initArticleCardServerList: ArticleServerInfo[];
    initIsWebpBrowser: boolean;
  }) {
    this.articleCardServerList = initArticleCardServerList;
    this.isWebpBrowser = initIsWebpBrowser;
  }

  articleCardList(): ArticleClientInfo[] {
    return this.articleCardServerList.map(
      (
        {
          id,
          writer,
          title,
          content,
          category,
          views,
          workbooks,
          mainImageUrl,
        },
        idx,
      ) => {
        const changeToClientData: ArticleClientInfo = {
          id,
          writerInfo: {
            name: writer.name,
            url: writer.url,
            imageUrl: writer.imageUrl,
          },
          thumbnail: this.isWebpBrowser
            ? mainImageUrl
            : ImageModel.changePngImage({ imageSrc: mainImageUrl }),

          isPriorityImage: idx < 2,
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
  private isWebpBrowser: boolean;
}
