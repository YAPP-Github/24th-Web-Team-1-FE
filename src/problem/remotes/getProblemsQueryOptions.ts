import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { PROBLEM_API_ROUTES } from "./api";
import { ProblemsInfo } from "@problem/types/problemInfo";

export const getProblemsInfo = ({
  articleId,
}: ProblemsInfoParams): Promise<ApiResponse<ProblemsInfo>> => {
  return axiosRequest("get", PROBLEM_API_ROUTES.problems(articleId));
};
export const getProblemsQueryOptions = ({
  articleId,
}: ProblemsInfoParams): UseQueryOptions<unknown, Error, ProblemsInfo> => {
  return {
    queryKey: ["get-Problems-info"],
    queryFn: () => getProblemsInfo({ articleId }),
  };
};

type ProblemsInfoParams = {
  articleId: number;
};
