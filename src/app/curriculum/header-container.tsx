"use client"

import {cn} from "@/util/tailwind";
import {useContext, useEffect, useState} from "react";
import {QuizContext} from "@/modules/Context";

const HeaderContainer = () => {
    const {user} = useContext(QuizContext);
    const [solvedQuizCount, setSolvedQuizCount] = useState(0);

    useEffect(() => {
       if(user) {
           const solvedQuizCount = getSolvedQuizCount(user);
           setSolvedQuizCount(solvedQuizCount)
       }
    },[])

    const getSolvedQuizCount = (user: UserInfo) => {
        return user.correctQuizIds.length + user.incorrectQuizIds.length;
    }


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