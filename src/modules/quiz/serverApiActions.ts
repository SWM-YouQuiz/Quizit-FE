"use server"
import {requestApi} from "@/util/fetcher";
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";
import 'server-only';
import {revalidateTag} from "next/cache";

export const getQuiz = async ({quizId}: {quizId: string}): Promise<Quiz> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${quizId}`,
        method: 'GET',
        token: session.user.accessToken
    });
}

export const postQuizCheck = async ({quizId, answer}: {quizId: string, answer: number}): Promise<QuizCheck> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${quizId}/check`,
        method: 'POST',
        token: session.user.accessToken,
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
}
export const getQuizOfChapter = async ({chapterId, page, size, range}: GetQuizOfChapterProps): Promise<Quiz[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/chapter/${chapterId}?page=${page}&size=${size}&range=${range}`,
        method: 'GET',
        token: session.user.accessToken
    });
}

export const getQuizMark = async ({id}: {id: string}): Promise<Quiz> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${id}/mark`,
        method: 'GET',
        token: session.user.accessToken
    });
}

export const getQuizEvaluate = async ({id, isLike}: {id: string, isLike: 'True'|'False'}): Promise<Quiz> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/quiz/${id}/evaluate?isLike=${isLike}`,
        method: 'GET',
        token: session.user.accessToken
    });
}

export const revalidateTagAction = ({tag}: {tag: string}) => {
    revalidateTag(tag);
}