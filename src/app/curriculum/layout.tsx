import {ReactNode} from "react";
import Layout from "@/components/Layout";
import {QuizFilterContext} from "@/modules/curriculum/Context";
import QuizFilterContainer from "@/modules/curriculum/components/QuizFilterContainer";

const CourseLayout = ({children}: {children: ReactNode}) => {

    const quizFilter: QuizFilter = {
        incorrectQuiz: false,
        markedQuiz: false,
        unsolvedQuiz: false
    }

    return (
        <Layout>
            <QuizFilterContainer>
                {children}
            </QuizFilterContainer>
        </Layout>
    )
}

export default CourseLayout;