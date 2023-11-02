"use client";
import Sheet, { SheetRef } from "react-modal-sheet";
import React, { useRef, useState } from "react";
import ExplanationComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/explanation";
import { useChat } from "ai/react";
import { isSupported, subscribe } from "on-screen-keyboard-detector";
import { Send } from "@/components/svgs";

type ExplanationSheetProps = {
    isBottomSheetOpen: boolean;
    closeBottomSheet: () => void;
    solution: string;
    answer: number;
    quizHtml: Quiz;
    select: number;
};

const ExplanationSheet = ({ isBottomSheetOpen, closeBottomSheet, solution, answer, quizHtml, select }: ExplanationSheetProps) => {
    const ref = useRef<SheetRef>();
    const [snapPoint, setSnapPoint] = useState(2);
    const { id: quizId, question, options: quizOptions } = quizHtml;
    const snapTo = (i: number) => {
        ref.current?.snapTo(i);
    };

    const chat = useChat({
        initialMessages: [{ id: `quiz-${quizId}-1`, role: "assistant", content: solution }],
    });
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = chat;

    const snapPoints = [800, 400, 0];

    return (
        <Sheet
            ref={ref}
            isOpen={isBottomSheetOpen}
            onClose={closeBottomSheet}
            snapPoints={snapPoints}
            initialSnap={1}
            onSnap={(e) => setSnapPoint(e)}
        >
            <Sheet.Container className="p-4">
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller draggableAt="both">
                        <ExplanationComponent quizHtml={quizHtml} answer={answer} solution={solution} select={select} chat={chat} />
                    </Sheet.Scroller>
                </Sheet.Content>
                <form
                    onSubmit={(e) =>
                        handleSubmit(e, {
                            options: {
                                body: {
                                    chapterId: quizHtml.chapterId,
                                    question: question,
                                    options: JSON.stringify(quizOptions),
                                    answer: quizOptions[answer],
                                    choice: quizOptions[select],
                                },
                            },
                        })
                    }
                >
                    <Input handleInputChange={handleInputChange} input={input} margin={snapPoints[snapPoint]} snapTo={snapTo} />
                </form>
            </Sheet.Container>
            <Sheet.Backdrop onTap={closeBottomSheet} />
        </Sheet>
    );
};

type InputProps = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    input: string;
    margin: number;
    snapTo: (i: number) => void | undefined;
};
const Input = ({ handleInputChange, input, margin, snapTo }: InputProps) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    if (isSupported()) {
        const unsubscribe = subscribe((visibility) => {
            if (visibility === "hidden") {
                setIsKeyboardVisible(false);
            } else {
                setIsKeyboardVisible(true);
            }
        });
    }

    return (
        <div className={`relative flex z-50 ${isKeyboardVisible ? "mb-80" : ""}`} style={{ bottom: `${800 - margin}px` }}>
            <input
                type="text"
                className={`w-full bg-stone-100 rounded-xl px-5 py-2.5 pl-5 focus:outline-none`}
                placeholder="더 자세한 설명을 해주세요"
                value={input}
                onChange={handleInputChange}
                onFocus={(e) => snapTo(0)}
            />
            <button className="absolute right-1 top-1 bottom-1 z-10" type="submit">
                <Send />
            </button>
        </div>
    );
};

export default ExplanationSheet;
