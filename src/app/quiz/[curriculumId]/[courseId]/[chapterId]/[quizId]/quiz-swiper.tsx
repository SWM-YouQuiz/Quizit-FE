"use client"

import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import {getQuiz, getQuizOfChapter, revalidateTagAction} from "@/modules/quiz/serverApiActions";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import Loading from "@/components/Loading";
import quiz from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import Ending from "@/components/Ending";

type QuizSwiperProps = {
    chapterId: string,
    couseId: string,
    curriculumId: string,
    quizId?: string
}

const QuizSwiper = ({curriculumId, couseId, chapterId, quizId}: QuizSwiperProps) => {
    const [page, setPage] = useState(-1);
    const [quizQueue, setQuizQueue] = useState<Quiz[]>([]);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        if(quizId) {
            addSingleQuiz(quizId);
        } else {
            addNewQuiz(chapterId);
        }
    }, []);

    const addSingleQuiz = async (quizId: string) => {
        const quiz = await getQuiz({quizId: quizId});
        setQuizQueue([quiz]);
    }

    const addNewQuiz = async (chapterId: string) => {
        const nextPage = page+1;
        const quizzes = await getQuizOfChapter({chapterId: chapterId, page: nextPage, size: 3, range: "-1,101"});
        if(quizzes.length === 0) {
            setEnd(true);
        } else {
            setQuizQueue(prev => [...prev, ...quizzes]);
            setPage(prev => prev + 1);
        }
    }

    const replaceUrlToCurrentQuiz = (currentQuizId: string) => {
        window.history.replaceState(null, "", `${currentQuizId}`);
    }

    if(!quizQueue || quizQueue.length===0) return <Loading/>
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            onInit={(swiper) => {
                window.history.replaceState(null, "", `/quiz/${curriculumId}/${couseId}/${chapterId}/${quizQueue[swiper.activeIndex].id}`);
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onSlideChange={(swiper) => {
                if(quizQueue.length < swiper.activeIndex) {
                    replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
                }
            }}
            onReachEnd={async (swiper ) => {
                await addNewQuiz(chapterId);
            }}
        >

            {quizQueue.map((quiz, idx) => (
                <SwiperSlide key={`quiz-${quiz.id}-${idx}`}>
                    <QuizComponent quiz={quiz}/>
                </SwiperSlide>
            ))}
            {end && (
                <SwiperSlide>
                    <Ending curriculumId={curriculumId} courseId={couseId}/>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default QuizSwiper;