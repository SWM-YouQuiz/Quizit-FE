"use client"

import React, {useCallback, useEffect, useRef, useState} from 'react';
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

    const addNewQuiz = async ({chapterId}: {chapterId: string}) => {
        const nextPage = page+1;
        const quizzes = await getQuizOfChapter({chapterId: chapterId, page: nextPage, size: 3, range: "-1,101"});
        const quizIds = quizzes.map(quiz => quiz.id);
        getQuizComponentsAction(quizIds)
            .then((newQuizComponents =>
                    setQuizQueue(prev => [
                        ...prev,
                        ...newQuizComponents
                    ])
            ))
        setPage(nextPage);
    }

    const replaceUrlToCurrentQuiz = (currentQuizId: string) => {
        window.history.replaceState(null, "", `${currentQuizId}`);
    }

    if(!quizQueue || quizQueue.length===0) return <p>loading</p>
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            onInit={(swiper) => {
                window.history.replaceState(null, "", `/quiz/${chapterId}/${quizQueue[swiper.activeIndex].id}`);
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onSlideChange={(swiper) => {
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onReachEnd={async (swiper ) => {
                await addNewQuiz({chapterId: chapterId});
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