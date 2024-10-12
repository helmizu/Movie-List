"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retryOnMount: true,
    }
  }
})

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClientConfig}>
      {children}
    </QueryClientProvider>
  );
}
