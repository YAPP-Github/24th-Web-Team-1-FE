import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 60 * 1000,
    },
  },
});

export default queryClient;
