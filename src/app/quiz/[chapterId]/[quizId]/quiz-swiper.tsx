"use client"

import React, {useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import {getQuizComponentsAction} from "@/modules/quiz/getQuizComponentsAction";
import {getQuizOfChapter} from "@/modules/quiz/serverApiActions";

type QuizSwiperProps = {
    quizExplanationComponents: QuizComponents[];
    chapterId: string
}

const QuizSwiper = ({quizExplanationComponents, chapterId}: QuizSwiperProps) => {
    const [page, setPage] = useState(0);
    const [quizQueue, setQuizQueue] = useState(quizExplanationComponents);

    const addNewQuiz = async ({chapterId, page}: {chapterId: string, page: number}) => {
        const quizzes = await getQuizOfChapter({chapterId: chapterId, page: page, size: 3, range: "-1,101"});
        const quizIds = quizzes.map(quiz => quiz.id);
        getQuizComponentsAction(quizIds)
            .then((newQuizComponents =>
                    setQuizQueue(prev => [
                        ...prev,
                        ...newQuizComponents
                    ])
            ))
    }

    if(quizQueue.length===0) return <p>loading</p>
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            initialSlide={0}
            onSlideChange={(swiper) => {
                window.history.replaceState(null, "", `${quizQueue[swiper.activeIndex].id}`)
            }}
            onReachEnd={async () => {
                addNewQuiz({chapterId: chapterId, page: page+1});
                setPage(prev => prev+1);
            }}
        >
            {quizQueue.map(({id, quizComponent}, idx) => (
                <SwiperSlide key={`quiz-${id}-${idx}`}>
                    {quizComponent}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;