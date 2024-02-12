import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
