"use server";
import { requestApi } from "@/util/fetcher";
import "server-only";

export const getCourses = async ({
    curriculumId,
    accessToken,
}: {
    curriculumId: string;
} & AccessToken): Promise<Course[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/curriculum/${curriculumId}`,
        method: "GET",
        token: accessToken,
    });
};

export const getChapters = async ({ courseId, accessToken }: { courseId: string } & AccessToken): Promise<Chapter[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/course/${courseId}`,
        method: "GET",
        token: accessToken,
    });
};

export const getCurriculums = async ({ accessToken }: AccessToken): Promise<Curriculum[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum`,
        method: "GET",
        token: accessToken,
    });
};

export const getCurriculum = async ({ id, accessToken }: { id: string } & AccessToken): Promise<Curriculum> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum/${id}`,
        method: "GET",
        token: accessToken,
    });
};

export const getCourse = async ({ id, accessToken }: { id: string } & AccessToken): Promise<Course> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/${id}`,
        method: "GET",
        token: accessToken,
    });
};

export const getChapter = async ({ chapterId, accessToken }: { chapterId: string } & AccessToken): Promise<Chapter> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}`,
        method: "GET",
        token: accessToken,
    });
};

export const getCurriculumProgress = async ({
    curriculumId,
    accessToken,
}: {
    curriculumId: string;
} & AccessToken): Promise<Progress> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum/${curriculumId}/progress`,
        method: "GET",
        token: accessToken,
        tags: [curriculumId],
    });
};

export const getCourseProgress = async ({
    courseId,
    accessToken,
}: {
    courseId: string;
} & AccessToken): Promise<Progress> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/${courseId}/progress`,
        method: "GET",
        token: accessToken,
        tags: [courseId],
    });
};

export const getChapterProgress = async ({
    chapterId,
    accessToken,
}: {
    chapterId: string;
} & AccessToken): Promise<Progress> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}/progress`,
        method: "GET",
        token: accessToken,
        tags: [chapterId],
    });
};
