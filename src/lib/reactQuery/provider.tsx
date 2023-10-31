"use client";

import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import React, {PropsWithChildren} from "react";

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {

    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchIntervalInBackground: false,
                    refetchInterval: false
                },
            },
        })
    );

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}
