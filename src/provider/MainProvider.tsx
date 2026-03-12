"use client";

import type { ReactNode } from "react";
import StateContextProvider from "@/provider/StateContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const MainProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StateContextProvider>
          {children}
          <Toaster />
        </StateContextProvider>
      </QueryClientProvider>
    </>

    // <Provider store={store}> // Redux store provider
    //   <QueryClientProvider client={queryClient}> // React Query provider
    //     <AuthContextProvider>
    //       <StateContextProvider>
    //         <HelmetProvider> // React Helmet Async provider for managing document head
    //           {children}
    //           <Toaster position="top-right" reverseOrder={false} /> // React Hot Toast for notifications
    //         </HelmetProvider>
    //       </StateContextProvider>
    //     </AuthContextProvider>
    //     <ReactQueryDevtools initialIsOpen={false} />
    //   </QueryClientProvider>
    // </Provider>
  );
};

export default MainProvider;
