import {ReactNode, Suspense} from "react";
import Layout from "@/components/Layout";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default QuizLayout;