"use client"
import Link from "next/link";
import Image from "next/image";
import {Rightarrow} from "@/components/svgs";
import {useContext} from "react";
import {QuizContext} from "@/lib/context/Context";
import {useRouter} from "next/navigation";

const ProfileCard = () => {
    const {user} = useContext(QuizContext);
    const router = useRouter();

    if(user === undefined) {
        throw new Error("유저 정보를 찾을 수 없습니다.");
    }

    const image = (user.image && user.image !== "none") ? user.image : "https://quizit-storage.s3.ap-northeast-2.amazonaws.com/character2.svg"

    return (
        <Link
            className="flex space-x-3"
            href="profile/badge"
        >
            <div className="grid place-items-center border border-neutral-100 w-18 h-18 rounded-full">
                <Image
                    src={image}
                    width={72}
                    height={72}
                    alt={"profileImage"}
                />
            </div>
            <div className="flex-grow flex justify-between">
                <div className="flex flex-col justify-between">
                    <div className="text-[13px] text-secondary-400 leading-[16px] mb-[3px]">Lv.{user.level}</div>
                    <div className="text-lg text-secondary-900 font-semibold leading-[21px] mb-[7px]">{user.username}</div>
                    <div className="bg-primary-100 px-2 py-1 text-primary-900 rounded text-[13px]">
                        하루 목표 {user.dailyTarget}개
                    </div>
                </div>
                <Rightarrow className="self-center"/>
            </div>
        </Link>
    )
}

export default ProfileCard;