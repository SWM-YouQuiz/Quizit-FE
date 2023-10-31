import {dehydrate, HydrationBoundary} from '@tanstack/react-query'

import {ReactNode} from "react";
import {getChapterProgress} from "@/modules/curriculum/serverApiActions";
import getQueryClient from "@/lib/reactQuery/get-query-client";
import {getAccessToken} from "@/modules/serverActions";

type HydratedChaptersProps = {
    children: ReactNode,
    chapterId: string
}
export const HydratedChapters = async ({children, chapterId}: HydratedChaptersProps) => {
    const queryClient = getQueryClient();
    const accessToken = await getAccessToken();
    await queryClient.prefetchQuery({
        queryKey: ['chapters', chapterId],
        queryFn: () => getChapterProgress({chapterId: chapterId, accessToken}),
    })
    const dehydratedState = dehydrate(queryClient)

    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    )
}