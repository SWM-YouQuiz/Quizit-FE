import {ReactNode} from "react";
import {Alert} from "@/components/svgs";
import {Header} from "@/components/Header";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";

const ProfileLayout = ({children}: {children: ReactNode}) => {

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default ProfileLayout;