import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import getQueryClient from "@/lib/reactQuery/get-query-client";

type HydratedCoursesProps = {
    children: ReactNode;
    courseId: string;
};
export const HydratedCourses = async ({ children, courseId }: HydratedCoursesProps) => {
    const queryClient = getQueryClient();

    const dehydratedState = dehydrate(queryClient);

    return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
