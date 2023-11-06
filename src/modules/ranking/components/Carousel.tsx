"use client";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "@/modules/ranking/styles/styles.css";

import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import RankingList from "@/modules/ranking/components/RankingList";
import { getUserCourseRanking, getUserRanking } from "@/modules/ranking/serverApiActions";
import { QuizContext } from "@/lib/context/Context";
import { revalidate } from "@/modules/serverActions";
import { getCourses, getCurriculums } from "@/modules/curriculum/serverApiActions";
import { useQuery } from "@tanstack/react-query";

const _getCourses = async (curriculums: Curriculum[] | undefined, accessToken: string) => {
    if (curriculums === undefined) return undefined;
    const courses2d: Course[][] = await Promise.all(
        curriculums.map((curriculum) =>
            getCourses({
                curriculumId: curriculum.id,
                accessToken,
            }),
        ),
    );
    const courses = courses2d.reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);

    return courses;
};
const Carousel = () => {
    const { accessToken } = useContext(QuizContext);
    const [rankingList, setRankingList] = useState<UserInfo[]>([]);
    const [index, setIndex] = useState(0);

    const { data: curriculums, isLoading: isCurriculumsLoading } = useQuery({
        queryKey: ["curriculums"],
        queryFn: () => getCurriculums({ accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["course"],
        queryFn: () => _getCourses(curriculums, accessToken),
        staleTime: 1000 * 60 * 60,
        enabled: !!curriculums,
    });

    useEffect(() => {
        revalidate("ranking");
    }, []);

    if (isCurriculumsLoading || isCoursesLoading || !courses) return null;

    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 10,
                    stretch: -20,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow]}
                style={{
                    overflow: "visible",
                }}
                onSlideChange={(swiper) => {
                    const index = swiper.activeIndex;
                    setIndex(index);
                    if (index === 0) {
                        getUserRanking({ accessToken }).then((rankingList) => setRankingList(rankingList));
                    } else {
                        const activeCourseId = courses[index - 1].id;
                        getUserCourseRanking({
                            accessToken,
                            courseId: activeCourseId,
                        }).then((rankingList) => setRankingList(rankingList));
                    }
                }}
                onInit={() => {
                    getUserRanking({ accessToken }).then((rankingList) => setRankingList(rankingList));
                }}
            >
                <SwiperSlide>
                    <CarouselItem title="전체 랭킹" image="/characters/onboarding4.svg" />
                </SwiperSlide>
                {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                        <CarouselItem title={course.title} image={course.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <RankingList key={`${index}`} rankingList={rankingList} />
        </>
    );
};

export default Carousel;

type CarouselItemProps = {
    title: string;
    image: string;
};

const CarouselItem = ({ title, image }: CarouselItemProps) => {
    return (
        <div className="w-[140px] h-full grid place-items-center bg-white rounded-2xl p-5 drop-shadow">
            <div className="flex flex-col items-center">
                <div className="grid place-items-center border border-neutral-100 w-[60px] h-[60px] rounded-full bg-white mb-1">
                    <Image src={image} width={60} height={60} alt={`${title} 코스 이미지`} />
                </div>
                <div className="font-semibold leading-[21px] text-lg mb-0.5 text-secondary-900 text-center break-keep">{title}</div>
                <div className="leading-4 text-[13px] text-white">&nbsp;</div>
            </div>
        </div>
    );
};
