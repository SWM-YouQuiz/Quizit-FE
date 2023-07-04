import {redirect, useRouter} from "next/navigation";
import Header from "@/app/home/Header";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const getSession = async () => {
    return await getServerSession(authOptions);
}
const HomeLayout = async ({children,}: { children: React.ReactNode; }) => {
    const session = await getSession();
    if(!session?.user?.token) {
        redirect("/login");
    }


    return (
        <>
            <Header session={session}/>
            <div className="conatiner mx-auto flex flex-col items-center mt-10 p-8">
                {children}
            </div>

        </>

    )
}

export default HomeLayout;