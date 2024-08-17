export class ImageModel {
  constructor() {
    this.imageSrc =
      "https://d3ex4vlh373syu.cloudfront.net/images/2024-07-04/nOF8xld3qCU4ZjM9.webp";
  }

  isWebpImage() {
    return this.imageSrc.endsWith(".webp");
  }

  async supportsWebP(): Promise<boolean> {
    const img = new Image();
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => resolve(false);
      img.src = this.imageSrc;
    });
  }

  async checkWebpSupport() {
    const isSupported = await this.supportsWebP();
    this.webpBrowser = isSupported;
  }

  static changePngImage({ imageSrc }: { imageSrc: string }) {
    return imageSrc.replace(/\.webp$/, ".png");
  }

  get webpBrowser() {
    return this.isWebpBrowser;
  }
  set webpBrowser(isSurported: boolean) {
    this.isWebpBrowser = isSurported;
  }

  private imageSrc: string;
  private isWebpBrowser: boolean = false;
}
