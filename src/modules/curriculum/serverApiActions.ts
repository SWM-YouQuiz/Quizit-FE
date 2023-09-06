import {requestApi} from "@/util/fetcher";
import {cache} from "react";
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";

export const getCourses = cache(async ({curriculumId}: {curriculumId: string}): Promise<Course[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/curriculum/${curriculumId}`,
        method: 'GET',
        token: session.user.accessToken,
    });
});

export const getChapters = cache(async ({courseId}: {courseId: string}): Promise<Chapter[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/course/${courseId}`,
        method: 'GET',
        token: session.user.accessToken,
    });
});

export const getCurriculums = cache(async (): Promise<Curriculum[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum`,
        method: 'GET',
        token: session.user.accessToken,
    });
});