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
        endpoint: `${process.env.API_URL}/api/course/curriculum/${curriculumId}`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};

export const getChapters = async ({ courseId, accessToken }: { courseId: string } & AccessToken): Promise<Chapter[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/chapter/course/${courseId}`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};

export const getCurriculums = async ({ accessToken }: AccessToken): Promise<Curriculum[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/curriculum`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};

export const getCurriculum = async ({ id, accessToken }: { id: string } & AccessToken): Promise<Curriculum> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/curriculum/${id}`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};

export const getCourse = async ({ id, accessToken }: { id: string } & AccessToken): Promise<Course> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/course/${id}`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};

export const getChapter = async ({ chapterId, accessToken }: { chapterId: string } & AccessToken): Promise<Chapter> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/chapter/${chapterId}`,
        method: "GET",
        token: accessToken,
        cache: "no-store",
    });
};
