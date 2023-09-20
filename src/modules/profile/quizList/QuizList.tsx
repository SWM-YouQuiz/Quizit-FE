"use client"
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import getQuizAction from "@/modules/profile/quizList/getQuizAction";
import delay from "delay";
import QuizCard from "@/modules/profile/components/QuizCard";
import Quizzes from "@/modules/profile/quizList/Quizzes";

const QuizList = ({quizIds}: {quizIds: string[]}) => {
    const refetchAmount = 6;
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [page, setPage] = useState(0);

    const { ref, inView } = useInView();

    const refetch = async () => {
        await delay(1000);
        const newQuizzes = await getQuizAction({quizIds: quizIds, page: page, refetchAmount: refetchAmount});
        setQuizzes(prev => [...prev, ...newQuizzes]);
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        if(inView) {
            refetch();
        }
    },[inView]);

    return (
        <div className="space-y-6">
            <Quizzes quizzes={quizzes}/>
            <div
                className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                ref={ref}
            >
               load more
            </div>
        </div>
    )
}

export default QuizList;