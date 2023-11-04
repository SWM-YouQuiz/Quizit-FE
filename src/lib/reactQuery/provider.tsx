"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import getQueryClient from "@/lib/reactQuery/get-query-client";

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
    const client = getQueryClient();

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
