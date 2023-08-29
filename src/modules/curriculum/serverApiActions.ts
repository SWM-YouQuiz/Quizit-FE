import {requestApi} from "@/util/fetcher";
import {cache} from "react";

export const revalidate = 3600;

export const getCourses = cache(async ({curriculumId}: {curriculumId: string}): Promise<Course[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/curriculum/${curriculumId}`,
        method: 'GET',
    });
});

export const getChapters = cache(async ({courseId}: {courseId: string}): Promise<Chapter[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/course/${courseId}`,
        method: 'GET',
    });
});

export const getCurriculums = cache(async (): Promise<Curriculum[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum`,
        method: 'GET',
    });
});