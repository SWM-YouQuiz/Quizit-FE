"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '@/modules/ranking/styles/styles.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from "next/image";

const Carousel = () => {
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
            <SwiperSlide>
                <CarouselItem title="전체 코스"/>
            </SwiperSlide>
        </Swiper>
    );
}

export default Carousel;

type CarouselItemProps = {
    title: string
}

const CarouselItem = ({title}: CarouselItemProps) => {
    return (
        <div className="w-full h-full grid place-items-center bg-primary-800 rounded-2xl p-5">
            <div className="flex flex-col items-center">
                <div className="grid place-items-center border border-neutral-100 w-[60px] h-[60px] rounded-full bg-white mb-1">
                    <Image
                        src={"./next.svg"}
                        width={60}
                        height={60}
                        alt={"next"}
                    />
                </div>
                <div className="font-semibold leading-[21px] text-lg mb-0.5 text-white">{title}</div>
                <div className="leading-4 text-[13px] text-white">123 / 1000</div>
            </div>
        </div>
    )
}