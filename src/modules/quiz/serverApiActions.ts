"use server"
import {requestApi} from "@/util/fetcher";
import 'server-only';

export const getQuiz = async ({quizId, accessToken}: {quizId: string} & AccessToken): Promise<Quiz> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${quizId}`,
        method: 'GET',
        token: accessToken,
        cache: 'no-store'
    });
}

export const postQuizCheck = async ({quizId, answer, accessToken}: {quizId: string, answer: number} & AccessToken): Promise<QuizCheck> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${quizId}/check`,
        method: 'POST',
        token: accessToken,
        body: {
            answer
        }
    });
}

type GetQuizOfChapterProps = {
    chapterId: string,
    page: number,
    size: number,
    range: string
} & AccessToken;
export const getQuizOfChapter = async ({chapterId, page, size, range, accessToken}: GetQuizOfChapterProps): Promise<Quiz[]> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/chapter/${chapterId}?page=${page}&size=${size}&range=${range}`,
        method: 'GET',
        token: accessToken,
        cache: 'no-store'
    });
}

export const getQuizMark = async ({id, accessToken}: {id: string} & AccessToken): Promise<Quiz> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${id}/mark`,
        method: 'GET',
        token: accessToken,
        cache: 'no-store'
    });
}

export const getQuizEvaluate = async ({id, isLike, accessToken}: {id: string, isLike: 'True'|'False'} & AccessToken): Promise<Quiz> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${id}/evaluate?isLike=${isLike}`,
        method: 'GET',
        token: accessToken,
        cache: 'no-store'
    });
}