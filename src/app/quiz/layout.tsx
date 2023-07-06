import {ReactNode} from "react";

const QuizLayout = ({children}: {children: ReactNode}) => {
    // Header에 가려지지 않기 위해 margin-top 적용
    return (
        <div className="flex-grow p-4">
            {children}
        </div>
    )
}

export default QuizLayout;