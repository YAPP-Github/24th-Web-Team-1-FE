import { ApiResponse, fewFetch } from "@api/fewFetch";
import { CategoryClientInfo, CategoryServerInfo } from "@common/types/category";
import { CategoryModel } from "@main/models/CategoryModel";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getArticleCategory = (): Promise<ApiResponse<CategoryListRes>> => {
  return fewFetch().get(API_ROUTE.ARTICLE_CATEGORY);
};

export const getArticleCategoryQueryOptions = (): UseQueryOptions<
  ApiResponse<CategoryListRes>,
  unknown,
  CategoryClientInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_ARICLE_CATEGORY],
    queryFn: () => getArticleCategory(),
    select: (data) => {
      const categories = data.data.data.categories;
      const categoryModel = new CategoryModel({
        initCategoryServerInfoList: categories,
      });
      return categoryModel.CategoryClientInfoList;
    },
  };
};

type CategoryListRes = {
  categories: CategoryServerInfo[];
};
