import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { API_ROUTE, QUERY_KEY } from "./api";
import {
  PromblemClientInfo,
  PromblemServerInfo,
} from "@problem/types/problemInfo";

export const getProblemInfo = ({
  problemId,
}: ProblemInfoParams): Promise<ApiResponse<PromblemServerInfo>> => {
  return axiosRequest("get", API_ROUTE.PROBLEM(problemId));
};
export const getProblemQueryOptions = ({
  problemId,
}: ProblemInfoParams): UseQueryOptions<
  ApiResponse<PromblemServerInfo>,
  Error,
  PromblemClientInfo
> => {
  return {
    queryKey: [QUERY_KEY.GET_PROBLEM, problemId],
    queryFn: () => getProblemInfo({ problemId }),
    select: ({ data }) => {
      const contents = data.contents.map(({ number, content }) => {
        return { number: number.toString(), content };
      });
      return { ...data, contents };
    },
  };
};

type ProblemInfoParams = {
  problemId: string;
};
