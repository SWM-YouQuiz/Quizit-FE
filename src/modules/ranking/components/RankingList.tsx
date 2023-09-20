import {getUserRanking} from "@/modules/ranking/serverApiActions";
import Image from "next/image";
import React, {ReactNode} from "react";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/modules/auth/auth";

const RankingList = async () => {
    const rankingList = await getUserRanking();
    const session = await getServerSession(authOptions) as Session;

    const myRanking = rankingList.findIndex(user => user.id === "64d51262a2caa56a8b9ddb8a")

    return (
        <div className="flex flex-col items-center -mt-[24px]">
            <MyItem user={rankingList[myRanking]} ranking={myRanking + 1}/>
            <div className="h-1/2 w-full rounded-t-2xl overflow-y-auto pt-[46px] bg-white drop-shadow-2xl">
                <div className="flex flex-col">
                    {
                        rankingList.map((user, idx) => (
                            <ItemContainer key={user.id}>
                                <Item user={user} ranking={idx+1}/>
                            </ItemContainer>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RankingList;

const MyItem = ({user, ranking}: {user: User, ranking: number}) => {

    return (
        <div className="relative top-[36px] z-50 flex justify-between inner-border-2 inner-border-primary-900 w-80 p-4 rounded-2xl bg-white">
            <Item user={user} ranking={ranking}/>
        </div>
    )
}

const ItemContainer = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex justify-between px-5 py-4">
            {children}
        </div>
    )
}

const Item = ({user, ranking}: {user: User, ranking: number}) => {
    return (
        <>
            <div className="flex">
                <div className="grid place-items-center border border-neutral-100 w-[40px] h-[40px] rounded-full bg-white">
                    <Image
                        src={"./next.svg"}
                        width={40}
                        height={40}
                        alt={"next"}
                    />
                </div>
                <div className="ml-2.5 flex flex-col justify-between">
                    {/*<div className="leading-[18px] text-secondary-400 text-[13px]">lv.100</div>*/}
                    <div className="leading-[19px] text-secondary-900 font-semibold">{user.nickname}</div>
                </div>
            </div>
            <div className="self-center leading-[19px] font-semibold text-secondary-900">
                {ranking}
            </div>
        </>
    )
}