'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const client = new QueryClient();
const ReactQueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
