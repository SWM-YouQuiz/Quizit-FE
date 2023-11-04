import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import getQueryClient from "@/lib/reactQuery/get-query-client";

type HydratedCurriculumsProps = {
    children: ReactNode;
};
export const HydratedCurriculums = async ({ children }: HydratedCurriculumsProps) => {
    const queryClient = getQueryClient();

    const dehydratedState = dehydrate(queryClient);

    return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
