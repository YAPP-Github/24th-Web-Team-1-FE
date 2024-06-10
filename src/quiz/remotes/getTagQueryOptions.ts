import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { TagInfo } from "@quiz/types/tagInfo";

const getTags = (): Promise<ApiResponse<TagInfo>> => {
  return axiosRequest("get", apiRoutes.tags);
};
export const getTagQueryOptions = (): UseQueryOptions<
  unknown,
  unknown,
  TagInfo
> => {
  return {
    queryKey: ["get-Tags"],
    queryFn: () => getTags(),
  };
};
