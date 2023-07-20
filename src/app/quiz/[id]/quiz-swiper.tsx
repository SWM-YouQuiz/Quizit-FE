"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const QuizSwiper = ({quizExplanationComponents}: {quizExplanationComponents: QuizExplanationComponents[]}) => {
    return (
        <Swiper className="container h-full w-full" threshold={1} navigation={true} spaceBetween={4} initialSlide={0} onSlideChange={() => {}}>
            {quizExplanationComponents.map(({id, quizComponent, explanationComponent}) => (
                <SwiperSlide key={`quiz-${id}`}>
                    <Swiper className="h-full" threshold={1} navigation={true} spaceBetween={4} initialSlide={0} autoHeight direction="vertical" >
                        <SwiperSlide className="flex flex-col">
                            {quizComponent}
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col">
                            {explanationComponent}
                        </SwiperSlide>
                    </Swiper>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;