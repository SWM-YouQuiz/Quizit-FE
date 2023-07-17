import {ReactNode} from "react";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow p-4 relative">
            {children}
        </div>
    )
}

export default QuizLayout;