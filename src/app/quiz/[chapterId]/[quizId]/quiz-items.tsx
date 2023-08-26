"use client"
import React, {useState} from "react";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";
import ExplanationSheet from "@/app/quiz/[chapterId]/[quizId]/explanation-sheet";
import {cn} from "@/util/tailwind";
import {HeartWhite} from "@/components/svgs";

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

const statusColor: Record<ItemStatus, string> = {
    'idle': 'text-secondary-800  bg-primary-50',
    'select': 'text-primary-800  bg-primary-200',
    'correct': 'text-primary-800  bg-primary-200 inner-border-2 inner-border-primary-800',
    'wrong': 'bg-bg-error inner-border-2 inner-border-error'
};

export const QuizItems = ({quizHtml}: {quizHtml: Quiz}) => {
    const {id: quizId, options: quizOptions} = quizHtml;
    const { itemsStatus, isQuizGraded, handleSubmit, changeItemSelect, solution, answer, select } = useQuizState(quizId);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
    }

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    }
    const handleOptionClicked = (selectedIndex: number) => {
        changeItemSelect(selectedIndex, isQuizGraded());
    };

    return (
        <div className="w-full flex flex-col">
            <div className="space-y-2.5">
                {
                    quizOptions.map((item, idx) => {
                        const itemString = `${optionSignature[idx]}. ${item}`
                        return (
                            <QuizItem
                                key={`quiz_item_${idx}`}
                                itemString={itemString}
                                itemStatus={itemsStatus[idx]}
                                idx={idx}
                                handleOptionClicked={handleOptionClicked}
                            />
                        )
                    })
                }
            </div>
            <div className="mt-5 flex h-[50px] justify-between space-x-2.5">
                <HeartButton clicked={false}/>
                {
                    isQuizGraded() ? (
                        <ExplanationButton handleClick={openBottomSheet}/>
                    ) : (
                        <SubmitButton handleSubmit={handleSubmit}/>
                    )
                }
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
    )
}

const QuizItem = ({itemString, itemStatus, idx, handleOptionClicked}: {
    itemString: string,
    itemStatus: ItemStatus,
    idx: number,
    handleOptionClicked: (selectedIndex: number) => void
}) => (
    <div
        className={cn(`min-h-[50px] w-full p-4 whitespace-normal break-words rounded-xl text-[13px]`, statusColor[itemStatus])}
        onClick={() => handleOptionClicked(idx)}
    >
        {itemString}
    </div>
)

const SubmitButton = ({handleSubmit}: {handleSubmit: () => void}) => (
    <div
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-point1`}
        onClick={() => handleSubmit()}
    >
        제출
    </div>
)

const ExplanationButton = ({handleClick}: {handleClick: () => void}) => (
    <div
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-black`}
        onClick={handleClick}
    >
        해설
    </div>
)

const HeartButton = ({clicked}: {clicked: boolean}) => (
    <div className="w-[50px] rounded-xl bg-primary-50 grid place-items-center">
        <HeartWhite/>
    </div>
)