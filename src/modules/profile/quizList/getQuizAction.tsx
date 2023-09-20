"use server"
import {getQuiz} from "@/modules/quiz/serverApiActions";
import QuizCard from "@/modules/profile/components/QuizCard";

type GetQuizActionProps = {
    quizIds: string[],
    page: number,
    refetchAmount: number
}

const getQuizAction = ({quizIds, page, refetchAmount}: GetQuizActionProps) => {
    const promises = quizIds.slice(page * refetchAmount, page * refetchAmount + refetchAmount)
        .map(async(quizId) => {
            const newQuiz = await getQuiz({quizId: quizId});
            return (
                <QuizCard key={newQuiz.id} alt={"퀴즈가 포함되는 코스"} imageUrl={"next.svg"} path="react > 기본 개념" title={newQuiz.question}/>
            )
        })

    return Promise.all(promises);
}

export default getQuizAction;