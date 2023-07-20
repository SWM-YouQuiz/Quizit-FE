"use client"

import React, {ReactNode, Suspense} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const QuizSwiper = ({children}: {children: ReactNode}) => {
    return (
        <Swiper className="container h-full w-full" navigation={true} spaceBetween={4} initialSlide={0} onSlideChange={() => {}}>
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={`quiz-${index}`}>
                    <Swiper className="h-full" navigation={true} spaceBetween={4} initialSlide={0} autoHeight direction="vertical" >
                        <SwiperSlide style={{display: "flex", flexDirection: "column"}}>{child}</SwiperSlide>
                        <SwiperSlide>answer</SwiperSlide>
                    </Swiper>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;