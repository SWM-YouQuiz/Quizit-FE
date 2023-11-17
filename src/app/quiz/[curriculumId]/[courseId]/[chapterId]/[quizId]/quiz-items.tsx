"use client";
import React, { useContext, useState } from "react";
import { useQuizState } from "@/modules/quiz/hooks/useQuizState";
import { cn } from "@/util/tailwind";
import ExplanationSheet from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/explanation-sheet";
import { motion } from "framer-motion";
import { HeartSquareButton } from "@/components/Heartbutton";
import { QuizContext } from "@/lib/context/Context";
import { deleteToken } from "@/modules/serverActions";
import { useRouter } from "next/navigation";
import { Check, Rightarrow } from "@/components/svgs";
import MotionDiv from "@/lib/animation/MotionDiv";

const optionSignature = ["A", "B", "C", "D"];

const statusColor: Record<ItemStatus, string> = {
    idle: "text-secondary-800  bg-primary-50 inner-border-primary-800",
    select: "text-secondary-800  bg-primary-50 inner-border-primary-800 inner-border-2",
    correct: "text-primary-800 bg-primary-200 inner-border-primary-800 inner-border-2 ",
    wrong: "text-error bg-bg-error inner-border-error",
};

type QuizItemsProps = {
    quizHtml: Quiz;
    idx?: number;
};

export const QuizItems = ({ quizHtml, idx }: QuizItemsProps) => {
    const router = useRouter();
    const { id: quizId, options: quizOptions, markedUserIds } = quizHtml;
    const { itemsStatus, isQuizGraded, handleSubmit, changeItemSelect, solution, answer, select } = useQuizState(quizId);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const { user } = useContext(QuizContext);

    if (user === undefined) {
        deleteToken();
        router.replace("/auth/login");
        return null;
    }

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };
    const handleOptionClicked = (selectedIndex: number) => {
        changeItemSelect(selectedIndex, isQuizGraded());
    };

    return (
        <>
            {idx === 0 && isQuizGraded() && (
                <MotionDiv className="absolute top-1/2 right-0">
                    <div className="flex">
                        <span className="text-secondary-800 font-semibold">스와이프로 다음 퀴즈</span>
                        <Rightarrow />
                    </div>
                </MotionDiv>
            )}
            <div className="w-full flex flex-col">
                <div className="space-y-2.5">
                    {quizOptions.map((item, idx) => {
                        return (
                            <QuizItem
                                key={`quiz_item_${idx}`}
                                optionSignature={optionSignature[idx]}
                                itemString={item}
                                itemStatus={itemsStatus[idx]}
                                idx={idx}
                                handleOptionClicked={handleOptionClicked}
                            />
                        );
                    })}
                </div>
                <div className="mt-5 flex h-[50px] justify-between space-x-2.5">
                    <HeartSquareButton quizId={quizId} markedUserIds={markedUserIds} userId={user.id} />
                    {isQuizGraded() ? <ExplanationButton handleClick={openBottomSheet} /> : <SubmitButton handleSubmit={handleSubmit} />}
                </div>
                <ExplanationSheet
                    isBottomSheetOpen={isBottomSheetOpen}
                    closeBottomSheet={closeBottomSheet}
                    solution={solution}
                    answer={answer}
                    select={select}
                    quizHtml={quizHtml}
                />
            </div>
        </>
    );
};

const QuizItem = ({
    itemString,
    itemStatus,
    idx,
    handleOptionClicked,
    optionSignature,
}: {
    itemString: string;
    itemStatus: ItemStatus;
    idx: number;
    handleOptionClicked: (selectedIndex: number) => void;
    optionSignature: string;
}) => (
    <motion.button
        type="button"
        className={cn(`flex justify-between items-center min-h-[50px] w-full p-4 rounded-xl`, statusColor[itemStatus])}
        onClick={() => handleOptionClicked(idx)}
        whileTap={{ scale: 0.95 }}
        animate={{
            scale: itemStatus === "correct" ? [1.0, 1.1, 1.0] : 1.0,
            rotate: itemStatus === "wrong" ? [0, 1, -1, 1, 0] : 0,
        }}
        transition={{ bounce: 1 }}
    >
        <div className="text-[12px] font-bold min-w-5 text-left">{optionSignature}</div>
        <div className="flex-grow">
            <p className="text-[12px] text-left break-keep">{itemString}</p>
        </div>
        {itemStatus === "correct" ? (
            <div className="min-w-6 h-4 flex items-center">
                <Check />
            </div>
        ) : (
            <div className="min-w-6" />
        )}
    </motion.button>
);

const SubmitButton = ({ handleSubmit }: { handleSubmit: () => void }) => (
    <motion.button
        type="button"
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-point1`}
        onClick={() => handleSubmit()}
        whileTap={{ scale: 0.95 }}
    >
        제출
    </motion.button>
);

const ExplanationButton = ({ handleClick }: { handleClick: () => void }) => (
    <div className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-black`} onClick={handleClick}>
        해설
    </div>
);
