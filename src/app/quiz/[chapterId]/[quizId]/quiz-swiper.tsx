"use client"

import React, {useCallback, useRef, useState} from 'react';
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
    const [size, setSize] = useState(1);
    const [quizQueue, setQuizQueue] = useState(quizExplanationComponents);

    const addNewQuiz = async ({chapterId, page}: {chapterId: string, page: number}) => {
        const quizzes = await getQuizOfChapter({chapterId: chapterId, page: page, size: size, range: "-1,101"});
        const quizIds = quizzes.map(quiz => quiz.id);
        getQuizComponentsAction(quizIds)
            .then((newQuizComponents =>
                    setQuizQueue(prev => [
                        ...prev,
                        ...newQuizComponents
                    ])
            ))
    }

    const replaceUrlToCurrentQuiz = (currentQuizId: string) => {
        window.history.replaceState(null, "", `${currentQuizId}`);
    }

    const handleSize = useCallback(() => {
            if(size == 1 || size == 2) {
                setSize(prev => prev+1);
            }
        }, [size]);

    if(quizQueue.length===0) return <p>loading</p>
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            initialSlide={0}
            onInit={(swiper) => {
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onSlideChange={(swiper) => {
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onReachEnd={async () => {
                addNewQuiz({chapterId: chapterId, page: page+1});
                setPage(prev => prev+1);
                handleSize();
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