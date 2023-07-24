"use client"

import React, {useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const QuizSwiper = ({quizExplanationComponents}: {quizExplanationComponents: QuizExplanationComponents[]}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            initialSlide={0}
            onSlideChange={() => {}}
        >
            {quizExplanationComponents.map(({id, quizComponent}) => (
                <SwiperSlide key={`quiz-${id}`}>
                    <Swiper
                        className="h-full"
                        autoHeight
                        threshold={20}
                        navigation
                        spaceBetween={4}
                        initialSlide={0}
                        direction="vertical"
                    >
                        <SwiperSlide className="flex flex-col">
                            {quizComponent}
                        </SwiperSlide>
                    </Swiper>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;