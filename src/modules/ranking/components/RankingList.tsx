"use client"
import Image from "next/image";
import React, {ReactNode, useContext} from "react";
import {QuizContext} from "@/lib/context/Context";
import MotionDiv from "@/lib/animation/MotionDiv";

type RankingList = {
    rankingList: UserInfo[]
}
const RankingList = ({rankingList}: RankingList) => {
    const {user, accessToken} = useContext(QuizContext);

    if(!user) throw new Error('유저 정보를 찾을 수 없습니다.');

    const myRanking = rankingList.findIndex(_user => _user.id === user.id)

    return (
        <div className="flex flex-col items-center -mt-[24px]">
            {myRanking!==-1 && <MyItem user={rankingList[myRanking]} ranking={myRanking + 1}/>}
            <div className="h-[calc(100dvh-350px)] w-full rounded-t-2xl overflow-y-auto pt-[46px] bg-white drop-shadow-2xl">
                <div className="flex flex-col">
                    {
                        rankingList.map((user, idx) => (
                            <ItemContainer key={user.id}>
                                <Item user={user} ranking={idx+1}/>
                            </ItemContainer>
                        ))
                    }
                    <ItemContainer key={user.id}>
                        <p></p>
                    </ItemContainer>
                </div>
            </div>
        </div>
    )
}

export default RankingList;

const MyItem = ({user, ranking}: {user: UserInfo, ranking: number}) => {

    return (
        <div className="relative top-[36px] z-50 flex justify-between inner-border-2 inner-border-primary-900 w-80 p-4 rounded-2xl bg-white">
            <Item user={user} ranking={ranking}/>
        </div>
    )
}

const ItemContainer = ({children}: {children: ReactNode}) => {
    return (
        <MotionDiv className="flex justify-between px-5 py-4">
            {children}
        </MotionDiv>
    )
}

const Item = ({user, ranking}: {user: UserInfo, ranking: number}) => {
    const userImage = user.image === "" ? "https://quizit-storage.s3.ap-northeast-2.amazonaws.com/character1.svg" : user.image
    return (
        <>
            <div className="flex">
                <div className="grid place-items-center border border-neutral-100 w-[40px] h-[40px] rounded-full bg-white">
                    <Image
                        src={userImage}
                        width={40}
                        height={40}
                        alt={"next"}
                    />
                </div>
                <div className="ml-2.5 flex flex-col justify-between">
                    <div className="leading-[18px] text-secondary-400 text-[13px]">lv.{user.level}</div>
                    <div className="leading-[19px] text-secondary-900 font-semibold">{user.username}</div>
                </div>
            </div>
            <div className="self-center leading-[19px] font-semibold text-secondary-900">
                {ranking}
            </div>
        </>
    )
}