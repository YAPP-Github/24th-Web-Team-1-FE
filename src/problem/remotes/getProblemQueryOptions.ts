import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { PROBLEM_API_ROUTES } from "./api";
import { PromblemInfo } from "@problem/types/problemInfo";

export const getProblemInfo = ({
  problemId,
}: ProblemInfoParams): Promise<ApiResponse<PromblemInfo>> => {
  return axiosRequest("get", PROBLEM_API_ROUTES.problems(problemId));
};
export const getProblemQueryOptions = ({
  problemId,
}: ProblemInfoParams): UseQueryOptions<
  ApiResponse<PromblemInfo>,
  Error,
  PromblemInfo
> => {
  return {
    queryKey: ["get-Problems-info"],
    queryFn: () => getProblemInfo({ problemId }),
    select: (data) => data.data,
  };
};

type ProblemInfoParams = {
  problemId: number;
};
