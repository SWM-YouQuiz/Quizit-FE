import {requestApi} from "@/util/fetcher";

export const getQuiz = async ({chapterId}: {chapterId: string}): Promise<Response> => {
    return requestApi({
        endpoint: `${process.env.NEXT_PUBLIC_NEXT_URL}/api/quiz/chapter/${chapterId}`,
        method: 'GET',
    });
}

export const postQuizCheck = async ({quizId}: {quizId: string}): Promise<QuizCheck> => {
    return requestApi({
        endpoint: `${process.env.NEXT_PUBLIC_NEXT_URL}/api/quiz/check`,
        method: 'POST',
        body: {
            quizId
        }
    });
}