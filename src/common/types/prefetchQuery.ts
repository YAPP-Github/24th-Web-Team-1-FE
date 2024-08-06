import { DehydratedState } from "@tanstack/react-query";

export interface PrefetchQuery<QueryData> {
  data: QueryData;
  state: DehydratedState;
}
