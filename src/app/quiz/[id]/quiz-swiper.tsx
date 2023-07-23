"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const QuizSwiper = ({quizExplanationComponents}: {quizExplanationComponents: QuizExplanationComponents[]}) => {
    return (
        <Swiper
            threshold={8}
            navigation
            spaceBetween={4}
            initialSlide={0}
            onSlideChange={() => {}}
        >
            {quizExplanationComponents.map(({id, quizComponent, explanationComponent}) => (
                <SwiperSlide key={`quiz-${id}`}>
                    <Swiper
                        className="h-full"
                        threshold={20}
                        navigation
                        spaceBetween={4}
                        initialSlide={0}
                        autoHeight
                        direction="vertical"
                    >
                        <SwiperSlide className="h-full">
                            {quizComponent}
                        </SwiperSlide>
                        <SwiperSlide  className="h-full">
                            {explanationComponent}
                        </SwiperSlide>
                    </Swiper>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;