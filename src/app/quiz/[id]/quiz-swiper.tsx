"use client"

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import QuizComponent from "@/app/quiz/[id]/quiz";
import {Quiz} from "@/modules/quiz/types";
const QuizSwiper = ({ quizs }: { quizs: Quiz[] }) => {
    return (
        <Swiper navigation={true} spaceBetween={4} initialSlide={0} className="container h-full w-full" onSlideChange={() => {}}>
            {quizs.map((quiz, index) => (
                <SwiperSlide key={index} style={{display: "flex", flexDirection: "column"}}>
                    <QuizComponent quiz={quiz}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;