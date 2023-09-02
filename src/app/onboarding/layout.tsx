import {ReactNode} from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";

const CourseLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout navbar={false}>
            {children}
        </Layout>
    )
}

export default CourseLayout;