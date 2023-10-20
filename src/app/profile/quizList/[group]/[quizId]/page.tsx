"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {BackArrow} from "@/components/svgs";
import {Header} from "@/components/Header";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import ShareButton from "@/modules/quiz/components/ShareButton";
import {useRouter} from "next/navigation";
import {getQuiz} from "@/modules/quiz/serverApiActions";
import Loading from "@/components/Loading";

type QuizPageParams = {
    quizId: string
}

const QuizPage = ({ params }: { params: QuizPageParams }) => {
    const [quiz, setQuiz] = useState<Quiz|null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const _quiz = await getQuiz({quizId: params.quizId});
                console.log("here", _quiz);
                setQuiz(_quiz);
            } catch (error) {
                console.error("An error occurred while fetching the quiz:", error);

            }
        }
        fetchQuiz();
    }, [params.quizId]);

    useEffect(() => {
        console.log("quiz Changed!", quiz);
    }, [quiz])

    if (quiz === null) return <Loading />;

    return (
        <div className="flex flex-col h-full">
            <Header>
                <button type="button" onClick={() => router.back()}>
                    <BackArrow/>
                </button>
                <div className="font-bold">퀴즈</div>
                <ShareButton/>
            </Header>
            <div className="flex-grow px-5 pb-5 pt-2.5 overflow-y-scroll bg-white">
                <QuizComponent quiz={quiz}/>
            </div>
        </div>
    )
}

export default QuizPage;

