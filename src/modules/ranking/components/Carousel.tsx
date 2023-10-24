"use client"
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '@/modules/ranking/styles/styles.css';

import {EffectCoverflow} from 'swiper/modules';
import Image from "next/image";

const Carousel = ({courses}: {courses: Course[]}) => {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 10,
                stretch: -20,
                modifier: 1,
                slideShadows: false,
            }}
            pagination={true}
            modules={[EffectCoverflow ]}
        >

            {
                courses.map(course => (
                    <SwiperSlide key={course.id}>
                        <CarouselItem title={course.title} image={course.image}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}

export default Carousel;

type CarouselItemProps = {
    title: string
    image: string
}

const CarouselItem = ({title, image}: CarouselItemProps) => {
    return (
        <div className="w-full h-full grid place-items-center bg-white rounded-2xl p-5">
            <div className="flex flex-col items-center">
                <div className="grid place-items-center border border-neutral-100 w-[60px] h-[60px] rounded-full bg-white mb-1">
                    <Image
                        src={image}
                        width={60}
                        height={60}
                        alt={`${title} 코스 이미지`}
                    />
                </div>
                <div className="font-semibold leading-[21px] text-lg mb-0.5 text-secondary-900 text-center break-keep">{title}</div>
                <div className="leading-4 text-[13px] text-white">&nbsp;</div>
            </div>
        </div>
    )
}