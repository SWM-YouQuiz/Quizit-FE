import {ReactNode} from "react";
import Layout from "@/components/Layout";
import QuizFilterContainer from "@/modules/curriculum/components/QuizFilterContainer";

const CourseLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout>
            <QuizFilterContainer>
                {children}
            </QuizFilterContainer>
        </Layout>
    )
}

export default CourseLayout;