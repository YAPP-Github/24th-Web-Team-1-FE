import { ImageModel } from "@shared/models/ImageModel";
import { WebpBrowser } from "@shared/types/image";
import { WorkbookClientInfo, WorkbookServerInfo } from "@workbook/types";

export class WorkbookInfolModel {
  constructor({
    initWorkbookServerInfo,
    initWebpBrowser,
  }: {
    initWorkbookServerInfo: WorkbookServerInfo;
    initWebpBrowser: WebpBrowser;
  }) {
    this.workbookServerInfo = initWorkbookServerInfo;
    this.webpBrowser = initWebpBrowser;
  }

  get workbookClientInfo(): WorkbookClientInfo {
    return {
      ...this.workbookServerInfo,
      mainImageUrl: this.webpBrowser.isWebpBrowser
        ? this.workbookServerInfo.mainImageUrl
        : ImageModel.changePngImage({
            imageSrc: this.workbookServerInfo.mainImageUrl,
          }),
    };
  }

  private workbookServerInfo: WorkbookServerInfo;
  private webpBrowser: WebpBrowser;
}
