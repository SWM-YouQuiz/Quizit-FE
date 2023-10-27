import {ReactNode} from "react";
import Layout from "@/components/Layout";
import QuizTouchEventHandler from "@/modules/quiz/QuizTouchEventHandler";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (

            <Layout navbar={false}>
                <QuizTouchEventHandler>
                    {children}
                </QuizTouchEventHandler>
            </Layout>

    )
}

export default QuizLayout;