import {ReactNode} from "react";
import Layout from "@/components/Layout";

const ProfileLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default ProfileLayout;