"use client";
import Sheet, { SheetRef } from "react-modal-sheet";
import React, { ReactNode, useRef } from "react";

type OpenSheetProps = {
    isBottomSheetOpen: boolean;
    closeBottomSheet: () => void;
    children?: ReactNode;
};

const OptionSheet = ({ isBottomSheetOpen, closeBottomSheet, children }: OpenSheetProps) => {
    const ref = useRef<SheetRef>();

    return (
        <Sheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} snapPoints={[1, 200]} initialSnap={1}>
            <Sheet.Container className="p-4">
                <Sheet.Header />
                <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
                    <Sheet.Scroller draggableAt="both">{children}</Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={closeBottomSheet} />
        </Sheet>
    );
};

export default OptionSheet;
