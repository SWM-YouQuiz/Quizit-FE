import {createContext, Dispatch, MouseEventHandler, SetStateAction} from "react";

export type OptionSheetContextType = null | {
    closeBottomSheet: () => void,
    openBottomSheet: () => void,
    handleOptionsClick: MouseEventHandler<HTMLDivElement>,
    handleDocumentClick: MouseEventHandler<HTMLDivElement>,
    handleCancelClick: MouseEventHandler<HTMLDivElement>,
    setDocumentUrl: Dispatch<SetStateAction<string>>
}

export const OptionSheetContext = createContext<OptionSheetContextType>(null);