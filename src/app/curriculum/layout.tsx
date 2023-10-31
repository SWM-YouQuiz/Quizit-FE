import { ReactNode } from "react";
import Layout from "@/components/Layout";

const CourseLayout = ({ children }: { children: ReactNode }) => {
    return <Layout>{children}</Layout>;
};

export default CourseLayout;
