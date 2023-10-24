"use client"
import {MouseEventHandler, ReactNode, useState} from "react";
import OptionSheet from "@/modules/curriculum/components/OptionSheet";
import {OptionSheetContext} from "@/lib/context/Context";

type OptionSheetContainer = {
    children: ReactNode
}
const OptionSheetContainer = ({children}: OptionSheetContainer) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [documentUrl, setDocumentUrl] = useState("");

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
    }

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    }

    const handleOptionsClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        openBottomSheet();
    }

    const handleDocumentClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        if(documentUrl)
            window.location.href = documentUrl
    }

    const handleCancelClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        closeBottomSheet();
    }

    return (
        <OptionSheetContext.Provider value={{
            closeBottomSheet,
            openBottomSheet,
            handleOptionsClick,
            handleDocumentClick,
            handleCancelClick,
            setDocumentUrl
        }}>
            {children}
            <OptionSheet isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
                <div className="flex flex-col p-1">
                    {documentUrl ? <Option onClick={handleDocumentClick}>공식문서 바로가기</Option> : null}
                    <Option onClick={handleCancelClick}>취소</Option>
                </div>
            </OptionSheet>
        </OptionSheetContext.Provider>
    )
}

export default OptionSheetContainer;

type OptionProps = {
    children: string,
    onClick: MouseEventHandler<HTMLDivElement>
}
const Option = ({children, onClick}: OptionProps) => {
    return (
        <div className="flex h-12 text-secondary-800 text-lg items-center" onClick={onClick}>
            {children}
        </div>
    )
}