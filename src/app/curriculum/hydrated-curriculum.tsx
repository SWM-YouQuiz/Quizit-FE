import {dehydrate, HydrationBoundary} from '@tanstack/react-query'
import {ReactNode} from "react";
import {getCurriculumProgress} from "@/modules/curriculum/serverApiActions";
import getQueryClient from "@/lib/reactQuery/get-query-client";
import {getAccessToken} from "@/modules/serverActions";

type HydratedCurriculumsProps = {
    children: ReactNode,
    curriculumId: string
}
export const HydratedCurriculums = async ({children, curriculumId}: HydratedCurriculumsProps) => {
    const queryClient = getQueryClient();
    const accessToken = await getAccessToken();
    await queryClient.prefetchQuery({
        queryKey: ['curriculums', curriculumId],
        queryFn: () => getCurriculumProgress({curriculumId, accessToken}),
    })
    const dehydratedState = dehydrate(queryClient)

    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    )
}