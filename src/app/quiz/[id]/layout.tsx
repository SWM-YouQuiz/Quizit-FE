import {ReactNode} from "react";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow p-4">
            {children}
        </div>
    )
}

export default QuizLayout;