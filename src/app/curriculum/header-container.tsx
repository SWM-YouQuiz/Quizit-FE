"use client"

import {cn} from "@/util/tailwind";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";

const HeaderContainer = () => {
    const [user, setUser] = useState<UserInfo>();

    const getUser = async () => {
        const session = await getSession();
        return session;
    }

    useEffect(() => {
       getUser()
           .then(session => {
               if(session) {
                   setUser(session.user.user);
               }
           })
    },[])

    const getSolvedQuizCount = () => {
        if(user) {
            return user.correctQuizIds.length + user.incorrectQuizIds.length;
        } else {
            return 0;
        }
    }

    const solvedQuizCount = getSolvedQuizCount();

    return (
        <div className="flex justify-between">
            <HeaderCard title={"내가 푼 퀴즈"} count={solvedQuizCount} className="bg-primary-900 mr-3"/>
            <HeaderCard title={"내가 만든 퀴즈"} count={0} className="bg-point3"/>
        </div>
    )
}

const HeaderCard = ({title, count, className=""}: {title: string, count: number, className?: string}) => (
    <div className={cn("flex flex-col w-full h-20 justify-between p-4 rounded-xl text-white", className)}>
        <div className="text-sm leading-[17px]">
            {title}
        </div>
        <div className="font-bold text-lg leading-[21px]">
            {count}&nbsp;개
        </div>
    </div>
)


export default HeaderContainer;