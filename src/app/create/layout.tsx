import {ReactNode} from "react";
import Layout from "@/components/Layout";

const CreateLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default CreateLayout;