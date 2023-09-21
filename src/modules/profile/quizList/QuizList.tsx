"use client"
import {ReactNode, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import getQuizAction from "@/modules/profile/quizList/getQuizAction";
import delay from "delay";
type QuizCardComponent = {
    id: string,
    component: ReactNode
}
const QuizList = ({quizIds}: {quizIds: string[]}) => {
    const refetchAmount = 6;
    const [quizzes, setQuizzes] = useState<QuizCardComponent[]>([]);
    const [page, setPage] = useState(0);

    const { ref, inView } = useInView();

    const refetch = async () => {
        await delay(100);

        getQuizAction({quizIds: quizIds.slice(page * refetchAmount, page * refetchAmount + refetchAmount)})
            .then((newQuizCardComponents) => {
                setQuizzes(prev => [...prev, ...newQuizCardComponents]);
            })

        setPage(prev => prev + 1);
    }

    useEffect(() => {
        if(inView) {
            refetch();
        }
    },[inView]);

    return (
        <div className="space-y-6">
            {
                !quizzes || quizzes.length === 0 ? (
                    <p>loading</p>
                    ) :
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