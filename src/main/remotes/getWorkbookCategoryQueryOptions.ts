import { ApiResponse, fewFetch } from "@api/fewFetch";
import { CategoryInfo } from "@common/types/category";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getWorkbookCategory = (): Promise<ApiResponse<CategoryInfo[]>> => {
  return fewFetch().get(API_ROUTE.CATEGORY);
};

export const getWorkbookCategoryQueryOptions = (): UseQueryOptions<
  ApiResponse<CategoryInfo[]>,
  unknown,
  CategoryInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_CATEGORY],
    queryFn: () => getWorkbookCategory(),
    select: (data) => data.data.data,
  };
};
