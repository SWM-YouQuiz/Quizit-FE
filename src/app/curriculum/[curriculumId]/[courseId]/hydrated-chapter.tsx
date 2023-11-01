import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ReactNode } from "react";
import getQueryClient from "@/lib/reactQuery/get-query-client";

type HydratedChaptersProps = {
    children: ReactNode;
    chapterId: string;
};
export const HydratedChapters = async ({ children, chapterId }: HydratedChaptersProps) => {
    const queryClient = getQueryClient();

    const dehydratedState = dehydrate(queryClient);

    return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
