import {dehydrate, HydrationBoundary} from '@tanstack/react-query'
import {ReactNode} from "react";
import {getCourseProgress} from "@/modules/curriculum/serverApiActions";
import getQueryClient from "@/lib/reactQuery/get-query-client";
import {getAccessToken} from "@/modules/serverActions";

type HydratedCoursesProps = {
    children: ReactNode,
    courseId: string
}
export const HydratedCourses = async ({children, courseId}: HydratedCoursesProps) => {
    const queryClient = getQueryClient();
    const accessToken = await getAccessToken();
    await queryClient.prefetchQuery({
        queryKey: ['courses', courseId],
        queryFn: () => getCourseProgress({courseId: courseId, accessToken}),
    })
    const dehydratedState = dehydrate(queryClient)

    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    )
}