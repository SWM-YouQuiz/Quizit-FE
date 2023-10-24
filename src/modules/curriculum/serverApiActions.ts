"use server"
import {requestApi} from "@/util/fetcher";
import 'server-only';
import {getAccessToken} from "@/modules/serverActions";

export const getCourses = async ({curriculumId}: {curriculumId: string}): Promise<Course[]> => {
    const accessToken = getAccessToken();

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/curriculum/${curriculumId}`,
        method: 'GET',
        token: accessToken
    });
}

export const getChapters = async ({courseId}: {courseId: string}): Promise<Chapter[]> => {
    const accessToken = getAccessToken();

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/course/${courseId}`,
        method: 'GET',
        token: accessToken
    });
}

export const getCurriculums = async (): Promise<Curriculum[]> => {
    const accessToken = getAccessToken();

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum`,
        method: 'GET',
        token: accessToken
    });
}

export const getChapter = async ({chapterId}: {chapterId: string}): Promise<Chapter> => {
    const accessToken = getAccessToken();

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}`,
        method: 'GET',
        token: accessToken
    });
}

export const getCurriculumProgress = async ({curriculumId, accessToken}: {curriculumId: string, accessToken: string}): Promise<Progress> => {

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/curriculum/${curriculumId}/progress`,
        method: 'GET',
        token: accessToken,
        tags: [curriculumId]
    });
}

export const getCourseProgress = async ({courseId}: {courseId: string}): Promise<Progress> => {
    const accessToken = getAccessToken();

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/course/${courseId}/progress`,
        method: 'GET',
        token: accessToken
    });
}

export const getChapterProgress = async ({chapterId, accessToken}: {chapterId: string} & AccessToken): Promise<Progress> => {

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}/progress`,
        method: 'GET',
        token: accessToken,
        tags: [chapterId]
    });
}