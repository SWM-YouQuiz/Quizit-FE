"use client";
import React, { ReactNode, useContext } from "react";
import "@/modules/quiz/styles/one-light.css";
import { QuizItems } from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-items";
import QuizTools from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-tools";
import { QuizContext } from "@/lib/context/Context";
import { useQuizState } from "@/modules/quiz/hooks/useQuizState";

const QuizComponent = ({ quiz, idx }: { quiz: Quiz; idx?: number }) => {
    const quizState = useQuizState(quiz);
    const { quizHtml } = quizState;

    return (
        <div className="flex flex-col h-full justify-between w-full px-5">
            <QuizHeader quizHtml={quizHtml} quizStatus={quizState.quizStatus} />
            <QuizContent quizContentHtml={quizHtml.question} />
            <BottomSideContainer>
                <QuizItems quizHtml={quizHtml} idx={idx} quizState={quizState} />
            </BottomSideContainer>
        </div>
    );
};

export default QuizComponent;

const QuizHeader = ({ quizHtml, quizStatus }: { quizHtml: Quiz; quizStatus: QuizStatus }) => {
    const { user } = useContext(QuizContext);
    if (user === undefined) {
        throw new Error("유저 정보를 찾을 수 없습니다.");
    }
    const { incorrectQuizIds, correctQuizIds } = user;

    if (correctQuizIds.includes(quizHtml.id)) {
        quizStatus = "correct";
    } else if (incorrectQuizIds.includes(quizHtml.id)) {
        quizStatus = "wrong";
    }

    return (
        <div className="h-[22px] w-full flex justify-between">
            <div className="flex space-x-3">
                <QuizAnswerRate answerRate={quizHtml.answerRate} />
                <Solved quizStatus={quizStatus} />
            </div>
            <QuizTools quizId={quizHtml.id} likedUserIds={quizHtml.likedUserIds} unlikedUserIds={quizHtml.unlikedUserIds} />
        </div>
    );
};

const QuizAnswerRate = ({ answerRate }: { answerRate: number }) => {
    const color = answerRate > 67 ? "bg-point2" : answerRate > 34 ? "bg-point4" : "bg-error";

    return (
        <div className={`rounded font-semibold text-white px-1.5 grid place-items-center ${color}`}>
            <p className="text-xs text-center leading-[16px]">정답률:&nbsp;{answerRate.toFixed(1)}%</p>
        </div>
    );
};

const Solved = ({ quizStatus }: { quizStatus: QuizStatus }) => {
    if (quizStatus === "correct") {
        return (
            <div className="rounded bg-point3 font-semibold px-1.5 grid place-items-center text-white">
                <p className="text-xs text-center leading-[16px]">맞힘</p>
            </div>
        );
    } else if (quizStatus === "wrong") {
        return (
            <div className="rounded bg-error font-semibold text-white px-1.5 grid place-items-center">
                <p className="text-xs text-center leading-[16px]">틀림</p>
            </div>
        );
    }
    return null;
};

const QuizContent = ({ quizContentHtml }: { quizContentHtml: string }) => (
    <div className="mt-2 flex-1 overflow-y-auto text-secondary-800 text-pretty" dangerouslySetInnerHTML={{ __html: quizContentHtml }} />
);

const BottomSideContainer = ({ children }: { children: ReactNode }) => {
    return <div className="w-full flex flex-col">{children}</div>;
};
