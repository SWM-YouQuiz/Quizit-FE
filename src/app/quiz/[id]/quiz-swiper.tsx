"use client"

import React, {ReactNode, Suspense} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

const QuizSwiper = ({children}: {children: ReactNode}) => {
    return (
        <Swiper navigation={true} spaceBetween={4} initialSlide={0} className="container h-full w-full" onSlideChange={() => {}}>
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={`quiz-${index}`} style={{display: "flex", flexDirection: "column"}}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuizSwiper;