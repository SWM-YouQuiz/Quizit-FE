"use client"
import Link from "next/link";
import Image from "next/image";
import {Rightarrow} from "@/components/svgs";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";

const ProfileCard = async () => {
    const [dailyTarget, setDailyTarget] = useState(0);
    const [profileImage, setProfileImage] = useState("");
    const getUser = async () => {
        const session = await getSession();
        if(session) {
            return session.user.user;
        }
        return null;
    }

    useEffect(() => {
        getUser()
            .then(user => {
                if(user) {
                    setDailyTarget(user.dailyTarget);
                    setProfileImage(user.image);
                }
            })
    },[]);

    return (
        <Link
            className="flex space-x-3"
            href="profile/badge"
        >
            <div className="grid place-items-center border border-neutral-100 w-18 h-18 rounded-full">
                <Image
                    src={profileImage ? profileImage : "https://quizit-storage.s3.ap-northeast-2.amazonaws.com/character2.svg"}
                    width={72}
                    height={72}
                    alt={"profileImage"}
                />
            </div>
            <div className="flex-grow flex justify-between">
                <div className="flex flex-col justify-between">
                    <div className="text-[13px] text-secondary-400 leading-[16px] mb-[3px]">Lv.100</div>
                    <div className="text-lg text-secondary-900 font-semibold leading-[21px] mb-[7px]">정의찬</div>
                    <div className="bg-primary-100 px-2 py-1 text-primary-900 rounded text-[13px]">
                        하루 목표 {dailyTarget}개
                    </div>
                </div>
                <Rightarrow className="self-center"/>
            </div>
        </Link>
    )
}

export default ProfileCard;