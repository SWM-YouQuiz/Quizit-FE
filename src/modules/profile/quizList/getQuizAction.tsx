"use server"
import {getQuiz} from "@/modules/quiz/serverApiActions";

type GetQuizActionProps = {
    quizIds: string[],
    page: number,
    refetchAmount: number
}

const getQuizAction = ({quizIds, page, refetchAmount}: GetQuizActionProps) => {
    const promises = quizIds.slice(page * refetchAmount, page * refetchAmount + refetchAmount)
        .map(async(quizId) => {
            const newQuiz = await getQuiz({quizId: quizId});
            return newQuiz;
        })

    return Promise.all(promises);
}

export default getQuizAction;