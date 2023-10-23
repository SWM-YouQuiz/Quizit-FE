import {ReactNode} from "react";
import Layout from "@/components/Layout";
import QuizContainer from "@/modules/quiz/components/QuizContext";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (
        <QuizContainer>
            <Layout navbar={false}>
                {children}
            </Layout>
        </QuizContainer>

    )
}

export default QuizLayout;