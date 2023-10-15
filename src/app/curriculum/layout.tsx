import {ReactNode} from "react";
import Layout from "@/components/Layout";
import {QuizFilterContext} from "@/modules/curriculum/Context";

const CourseLayout = ({children}: {children: ReactNode}) => {

    const quizFilter: QuizFilter = {
        incorrectQuiz: false,
        markedQuiz: false,
        unsolvedQuiz: false
    }

    return (
        <Layout>
            <QuizFilterContext.Provider value={{
                quizFilter: quizFilter
            }}>
                {children}
            </QuizFilterContext.Provider>
        </Layout>
    )
}

export default CourseLayout;