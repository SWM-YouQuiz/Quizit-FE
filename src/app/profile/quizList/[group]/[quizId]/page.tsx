"use client";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import ShareButton from "@/modules/quiz/components/ShareButton";
import { useRouter } from "next/navigation";
import { getQuiz } from "@/modules/quiz/serverApiActions";
import QuizLoading from "@/components/QuizLoading";
import { QuizContext } from "@/lib/context/Context";
import BackButton from "@/components/BackButton";

type QuizPageParams = {
    quizId: string;
};

const QuizPage = ({ params }: { params: QuizPageParams }) => {
    const { accessToken } = useContext(QuizContext);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const _quiz = await getQuiz({
                    quizId: params.quizId,
                    accessToken,
                });
                setQuiz(_quiz);
            } catch (error) {
                console.error("An error occurred while fetching the quiz:", error);
            }
        };
        fetchQuiz();
    }, [params.quizId]);

    if (quiz === null) return <QuizLoading />;

    return (
        <div className="flex flex-col h-full">
            <Header>
                <BackButton />
                <div className="font-bold">퀴즈</div>
                <ShareButton />
            </Header>
            <div className="flex-grow pb-5 pt-2.5 overflow-y-scroll bg-white">
                <QuizComponent quiz={quiz} />
            </div>
        </div>
    );
};

export default QuizPage;
