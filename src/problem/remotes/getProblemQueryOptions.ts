import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import {
  PromblemClientInfo,
  PromblemServerInfo,
} from "@problem/types/problemInfo";
import { API_ROUTE, QUERY_KEY } from "./api";

export const getProblemInfo = ({
  problemId,
}: ProblemInfoParams): Promise<ApiResponse<PromblemServerInfo>> => {
  return fewFetch().get(API_ROUTE.PROBLEM(problemId));
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
      const contents = data.data.contents.map(({ number, content }) => {
        return { number: number.toString(), content };
      });
      return { ...data.data, contents };
    },
  };
};

type ProblemInfoParams = {
  problemId: string;
};
