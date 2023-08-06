"use client"

import React, {useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import {getQuizComponents} from "@/modules/quiz/getQuizComponents";

type QuizSwiper = {
    quizExplanationComponents: QuizComponents[];
}

const QuizSwiper = ({quizExplanationComponents}: QuizSwiper) => {
    const [quizQueue, setQuizQueue] = useState(quizExplanationComponents);

    const addNewQuiz = (quizIds: string[]) => {
        getQuizComponents(quizIds)
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
                console.log("newQuiz")
                addNewQuiz(["64cd2a283670d05612c7b5ce", "64cd2a283670d05612c7b5ce"]);
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