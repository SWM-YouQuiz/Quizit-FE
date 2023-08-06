import {requestApi} from "@/util/fetcher";
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";

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

export const getQuizOfChapter = async ({chapterId}: {chapterId: string}): Promise<Quiz[]> => {
    let session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}`,
        method: 'GET',
        token: session.user.accessToken
    });
}

export const getQuizOfChapterId = async ({chapterId, quizId}: {chapterId: string, quizId: string}): Promise<Quiz> => {
    let session = await authenticateSession(authOptions);
    const res: Quiz[] =  await requestApi({
        endpoint: `${process.env.API_URL}/api/quiz/chapter/${chapterId}`,
        method: 'GET',
        token: session.user.accessToken
    });
    console.log("res", res.find(quiz => quiz.id === quizId));
    const quiz = res.find(quiz => quiz.id === quizId);
    if(quiz === undefined) {
        throw new Error("quiz not founded!");
    }
    return quiz;
}