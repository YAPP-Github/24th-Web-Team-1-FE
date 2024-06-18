import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { API_ROUTE, QUERY_KEY } from "./api";
import { PromblemInfo } from "@problem/types/problemInfo";

export const getProblemInfo = ({
  problemId,
}: ProblemInfoParams): Promise<ApiResponse<PromblemInfo>> => {
  return axiosRequest("get", API_ROUTE.PROBLEM(problemId));
};
export const getProblemQueryOptions = ({
  problemId,
}: ProblemInfoParams): UseQueryOptions<
  ApiResponse<PromblemInfo>,
  Error,
  PromblemInfo
> => {
  return {
    queryKey: [QUERY_KEY.GET_PROBLEM, problemId],
    queryFn: () => getProblemInfo({ problemId }),
    select: (data) => data.data,
  };
};

type ProblemInfoParams = {
  problemId: string;
};
