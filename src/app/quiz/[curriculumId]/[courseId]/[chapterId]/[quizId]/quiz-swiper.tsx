"use client";

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { getQuiz, getQuizOfChapter } from "@/modules/quiz/serverApiActions";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import QuizLoading from "@/components/QuizLoading";
import Ending from "@/components/Ending";
import { QuizContext, QuizFilterContext } from "@/lib/context/Context";
import { useFilter } from "@/modules/quiz/hooks/useFilter";
import { getUser } from "@/modules/profile/serverApiActions";
import QuizNull from "@/components/QuizNull";
import { revalidate } from "@/modules/serverActions";
import getQueryClient from "@/lib/reactQuery/get-query-client";

type QuizSwiperProps = {
    chapterId: string;
    courseId: string;
    curriculumId: string;
    quizId?: string;
};

const QuizSwiper = ({ curriculumId, courseId, chapterId, quizId }: QuizSwiperProps) => {
    const { accessToken, user, dispatch } = useContext(QuizContext);
    const { quizFilter } = useContext(QuizFilterContext);
    if (user === undefined) throw new Error("유저를 찾을 수 없습니다.");
    const { filter } = useFilter(quizFilter, user);
    const [page, setPage] = useState(-1);
    const [quizQueue, setQuizQueue] = useState<Quiz[]>([]);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const queryClient = getQueryClient();

    useEffect(() => {
        if (quizId) {
            addSingleQuiz(quizId);
        } else {
            addNewQuiz(chapterId, page);
        }
    }, [quizId]);

    const updateUser = async () => {
        getUser({ accessToken, cache: "no-store" }).then((user) => {
            if (dispatch) {
                dispatch({ type: "SET_USER", payload: user });
            }
        });
    };

    useEffect(() => {
        (async () => {
            await updateUser();
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        return () => {
            revalidate(curriculumId);
            revalidate(courseId);
            revalidate(chapterId);
            queryClient.invalidateQueries({ queryKey: ["curriculum", curriculumId, "progress"] });
            queryClient.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
            queryClient.invalidateQueries({ queryKey: ["chapter", chapterId, "progress"] });
        };
    }, [chapterId, courseId, curriculumId]);

    const addSingleQuiz = async (quizId: string) => {
        const quiz = await getQuiz({ quizId: quizId, accessToken });
        setQuizQueue([quiz]);
    };

    const addNewQuiz = async (chapterId: string, page: number) => {
        const nextPage = page + 1;
        const quizzes = await getQuizOfChapter({
            chapterId: chapterId,
            page: nextPage,
            size: 3,
            range: "-1,101",
            accessToken,
        });
        if (quizzes.length === 0) {
            setEnd(true);
        } else {
            const filteredQuizzes = filter(quizzes);

            if (filteredQuizzes.length === 0) {
                await addNewQuiz(chapterId, nextPage);
                return;
            }

            setQuizQueue((prev) => [...prev, ...filteredQuizzes]);
            setPage((prev) => prev + 1);
        }
    };

    const replaceUrlToCurrentQuiz = (currentQuizId: string) => {
        window.history.replaceState(null, "", `${currentQuizId}`);
    };
    if (!quizQueue || quizQueue.length === 0 || loading) {
        if (end) return <QuizNull curriculumId={curriculumId} courseId={courseId} />;
        else return <QuizLoading />;
    }
    return (
        <Swiper
            className="container h-full w-full"
            threshold={8}
            navigation
            spaceBetween={4}
            onInit={(swiper) => {
                window.history.replaceState(null, "", `/quiz/${curriculumId}/${courseId}/${chapterId}/${quizQueue[swiper.activeIndex].id}`);
                replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
            }}
            onSlideChange={(swiper) => {
                try {
                    replaceUrlToCurrentQuiz(quizQueue[swiper.activeIndex].id);
                } catch {}
            }}
            onReachEnd={async (swiper) => {
                await addNewQuiz(chapterId, page);
            }}
        >
            {quizQueue.map((quiz, idx) => (
                <SwiperSlide key={`quiz-${quiz.id}-${idx}`}>
                    <QuizComponent quiz={quiz} idx={idx} />
                </SwiperSlide>
            ))}
            {end && (
                <SwiperSlide>
                    <Ending curriculumId={curriculumId} courseId={courseId} />
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default QuizSwiper;
