import {ReactNode} from "react";
import Layout from "@/components/Layout";

const QuizLayout = ({children}: {children: ReactNode}) => {

    return (

            <Layout navbar={false}>
                {children}
            </Layout>

    )
}

export default QuizLayout;