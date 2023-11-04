import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import getQueryClient from "@/lib/reactQuery/get-query-client";

type HydratedProviderProps = {
    children: ReactNode;
};
export const HydratedProvider = async ({ children }: HydratedProviderProps) => {
    const queryClient = getQueryClient();

    const dehydratedState = dehydrate(queryClient);

    return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
