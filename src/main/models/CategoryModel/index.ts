import { CategoryClientInfo, CategoryServerInfo } from "@common/types/category";

export class CategoryModel {
  constructor({
    initCategoryServerInfoList,
  }: {
    initCategoryServerInfoList: CategoryServerInfo[];
  }) {
    this.categoryServerInfoList = initCategoryServerInfoList;
  }

  get CategoryClientInfoList(): CategoryClientInfo[] {
    return this.categoryServerInfoList.map(({ code, name }) => ({
      name,
      code,
    }));
  }

  private categoryServerInfoList: CategoryServerInfo[];
}
