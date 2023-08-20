import {ReactNode, Suspense} from "react";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow relative max-h-[calc(100dvh)]">
            {children}
        </div>
    )
}

export default QuizLayout;