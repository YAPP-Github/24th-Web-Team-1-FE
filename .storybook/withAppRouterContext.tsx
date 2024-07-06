import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 300000,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      retry: 1,
    },
  },
});
const withAppRouterContext = (Story: FC) => (
  <QueryClientProvider client={queryClient}>
    <AppRouterContext.Provider value={{} as AppRouterInstance}>
      <Story />
    </AppRouterContext.Provider>
  </QueryClientProvider>
);

export default withAppRouterContext;
