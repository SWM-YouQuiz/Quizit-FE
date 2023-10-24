"use client"
import {Downarrow} from "@/components/svgs";
import React, {MouseEventHandler, useContext, useState} from "react";
import Modal from "@/components/ui/Modal"
import Input from "@/components/ui/Input";
import {updateUser} from "@/modules/profile/serverApiActions";
import {motion} from "framer-motion";
import {cn} from "@/util/tailwind";
import {QuizContext} from "@/lib/context/Context";
import {useRouter} from "next/navigation";

export const NicknameEdit = () => {
    return (
        <div className="space-y-3">
            <div className="text-secondary-900 font-bold">닉네임 변경</div>
            <Input />
        </div>
    )
}

export const GoalEdit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    return (
        <div className="space-y-3">
            <div className="text-secondary-900 font-bold">목표 설정</div>
            <div
                className="flex justify-between items-center w-full h-12 rounded-lg border-2 border-neutral-200 px-4 text-secondary-900"
                onClick={() => openModal()}
            >
                <div className="text-secondary-400">선택</div>
                <Downarrow/>
            </div>
            <Modal onClose={closeModal} open={isModalOpen}>
                <GoalEditModal/>
            </Modal>
        </div>
    )
}

const GoalEditModal = () => {
   const {user, dispatch, accessToken} = useContext(QuizContext);
   const router = useRouter();

   if(user === undefined) {
       throw new Error("유저 정보를 찾을 수 없습니다.");
   }

   const update = (user: UserInfo) => {
       if (dispatch) {
           dispatch({type: 'SET_USER', payload: user});
       }
   }

    return (
        <div className="flex flex-col space-y-2.5 overflow-auto">
            <GoalEditItem title="캐주얼" goalCount={5} user={user} update={update} accessToken={accessToken}/>
            <GoalEditItem title="보통" goalCount={10} user={user} update={update} accessToken={accessToken}/>
            <GoalEditItem title="열심히" goalCount={20} user={user} update={update} accessToken={accessToken}/>
            <GoalEditItem title="하드코어" goalCount={40} user={user} update={update} accessToken={accessToken}/>
        </div>
    )
}

type GoarEditItem = {
    title: string,
    goalCount: number,
    user: UserInfo,
    update: (user: UserInfo) => void,
} & AccessToken;

const GoalEditItem = ({title, goalCount, user, update, accessToken}: GoarEditItem) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        updateUser({
            body: {
                ...user,
                dailyTarget: goalCount
            },
            userId: user.id,
            accessToken: accessToken
        }).then(user => {
            update(user);
        })
    }

    const selected = user.dailyTarget === goalCount ? "inner-border-2 inner-border-primary-900" : "";

    return (
        <motion.button
            type="button"
            className={cn("flex justify-between p-5 rounded-xl border-[1px] shadow", selected)}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
        >
            <div className="text-secondary-900">{title}</div>
            <div className="text-secondary-800 text-[13px]">하루 {goalCount}문제 이상</div>
        </motion.button>
    )
}