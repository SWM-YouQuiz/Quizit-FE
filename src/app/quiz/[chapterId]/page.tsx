
import React, {cache, Suspense} from "react";
import {getQuizOfChapter} from "@/modules/quiz/apiServices";
import {redirect} from "next/navigation";

const getQuizIds = async (chapterId: string) => {
    const quizzes =  await getQuizOfChapter({chapterId: chapterId});
    const quizIds = quizzes.map(quiz => quiz.id);
    return quizIds;
}
const QuizPage = async ({ params }: { params: { chapterId: string } }) => {
    const quizIds: string[] = await getQuizIds(params.chapterId);

    if(quizIds.length === 0) {
        throw new Error("퀴즈를 불러오는 중 오류가 발생했습니다.");
    }

    redirect(`${params.chapterId}/${quizIds[0]}`);
}

export default QuizPage;

