"use client"
import {ReactNode, useEffect, useState} from "react";
import {QuizContext, QuizFilterContext} from "@/modules/curriculum/Context";
import {useSession} from "next-auth/react";

type QuizContextProps = {
    children: ReactNode
}
const QuizContainer = ({children}: QuizContextProps) => {
    const [user, setUser] = useState<UserInfo | undefined>();
    const {data, status} = useSession();


    useEffect(() => {
        const user = status === "authenticated" ? data.user.user : undefined;
        setUser(user);
    }, [data, status])

    return (
        <QuizContext.Provider value={{user}}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizContainer;