"use client"

import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import {getQuizOfChapter, revalidateTagAction} from "@/modules/quiz/serverApiActions";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";

type QuizSwiperProps = {
    quizzes: Quiz[],
    chapterId: string,
    couseId: string,
    curriculumId: string
}

const QuizSwiper = ({quizzes, curriculumId, couseId, chapterId}: QuizSwiperProps) => {
    const [page, setPage] = useState(1);
    const [quizQueue, setQuizQueue] = useState<Quiz[]>(quizzes);

    const addNewQuiz = async ({chapterId}: {chapterId: string}) => {
        const nextPage = page+1;
        const quizzes = await getQuizOfChapter({chapterId: chapterId, page: nextPage, size: 3, range: "-1,101"});
        setQuizQueue(prev => [...prev, ...quizzes]);
        setPage(prev => prev + 1);
    }

    const replaceUrlToCurrentQuiz = (currentQuizId: string) => {
        window.history.replaceState(null, "", `${currentQuizId}`);
    }

    console.log("quizzes", quizzes);

    if(!quizQueue || quizQueue.length===0) return <p>loading</p>
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            onInit={(swiper) => {
                window.history.replaceState(null, "", `/quiz/${curriculumId}/${couseId}/${chapterId}/${quizQueue[swiper.activeIndex].id}`);
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onSlideChange={(swiper) => {
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onReachEnd={async (swiper ) => {
                await addNewQuiz({chapterId: chapterId});
            }}
        >
            {quizQueue.map((quiz, idx) => (
                <SwiperSlide key={`quiz-${quiz.id}-${idx}`}>
                    <QuizComponent quiz={quiz}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;