"use client"
import Sheet, {SheetRef} from "react-modal-sheet";
import ExplanationComponent from "@/app/quiz/[chapterId]/[quizId]/explanation";
import React, {ReactNode, useRef, useState} from "react";

type OpenSheetProps = {
    isBottomSheetOpen: boolean,
    closeBottomSheet: () => void,
    children?: ReactNode
}

const OptionSheet = ({isBottomSheetOpen, closeBottomSheet, children}: OpenSheetProps) => {
    const ref = useRef<SheetRef>();
    return (
        <Sheet
            isOpen={isBottomSheetOpen}
            onClose={closeBottomSheet}
            snapPoints={[1, 200]}
            initialSnap={1}
        >
            <Sheet.Container className="p-4">
                <Sheet.Header />
                <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
                    <Sheet.Scroller draggableAt="both">
                        {children}
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}

export default OptionSheet;