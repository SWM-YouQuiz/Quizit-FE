import {useRouter} from "next/navigation";
import Header from "@/app/home/components/Header";
import React from "react";

const HomeLayout = ({children,}: { children: React.ReactNode; }) => {

    return (
        <>
            <Header/>
            <div className="conatiner mx-auto flex flex-col items-center mt-10 p-8">
                {children}
            </div>

        </>

    )
}

export default HomeLayout;