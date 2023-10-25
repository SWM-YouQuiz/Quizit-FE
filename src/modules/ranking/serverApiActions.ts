"use server"
import {requestApi} from "@/util/fetcher";

export const getUserRanking = async ({accessToken}: AccessToken): Promise<UserInfo[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/ranking`,
        method: 'GET',
        token: accessToken,
        tags: ['ranking']
    });
}

export const getUserCourseRanking = async ({accessToken, courseId}: {courseId: string} & AccessToken): Promise<UserInfo[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/ranking/course/${courseId}`,
        method: 'GET',
        token: accessToken,
        tags: ['ranking']
    });
}