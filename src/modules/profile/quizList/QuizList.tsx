"use client"
import {ReactNode, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import getQuizAction from "@/modules/profile/quizList/getQuizAction";
import delay from "delay";
import Divider from "@/modules/profile/quizList/Divider";
import {QuizCardComponent} from "@/app/profile/quizList/[group]/page";


const QuizList = ({quizIds, init}: {quizIds: string[], init: QuizCardComponent[]}) => {
    const refetchAmount = 6;
    const [quizzes, setQuizzes] = useState<QuizCardComponent[]>([...init]);
    const [page, setPage] = useState(1);

    const { ref, inView } = useInView();

    const refetch = async () => {
        await delay(100);

        console.log("page", page, quizIds.slice(page * refetchAmount, page * refetchAmount + refetchAmount));

        if(page * refetchAmount + refetchAmount > quizIds.length) return;
        getQuizAction({quizIds: quizIds.slice(page * refetchAmount, page * refetchAmount + refetchAmount)})
            .then(newQuizComponents => {
                setQuizzes(prev => [
                    ...prev,
                    ...newQuizComponents
                ])
                setPage(prev => prev + 1);
            })

    }

    useEffect(() => {
        if(inView) {
            console.log("active");
            refetch();
        }
    },[inView]);

    return (
        <div className="space-y-6">
            {
                quizzes.map(({id, component}) => (
                    <div key={id}>
                        {component}
                    </div>
                ))
            }
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