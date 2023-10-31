import Sheet, { SheetRef } from "react-modal-sheet";
import React, { useRef } from "react";
import ExplanationComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/explanation";

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
    return (
        <Sheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} snapPoints={[1, 400, 0]} initialSnap={1}>
            <Sheet.Container className="p-4">
                <Sheet.Header />
                <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
                    <Sheet.Scroller draggableAt="both">
                        <ExplanationComponent quizHtml={quizHtml} answer={answer} solution={solution} select={select} />
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
};

export default ExplanationSheet;
