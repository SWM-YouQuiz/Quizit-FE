"use client"
import {Downarrow} from "@/components/svgs";
import React, {MouseEventHandler, useContext, useState} from "react";
import Modal from "@/components/ui/Modal"
import Input from "@/components/ui/Input";
import {updateUser} from "@/modules/profile/serverApiActions";
import {motion} from "framer-motion";
import {cn} from "@/util/tailwind";
import {QuizContext, QuizContextType} from "@/lib/context/Context";
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";
import {revalidate} from "@/modules/serverActions";

export const NicknameEdit = () => {
    const {user, dispatch, accessToken} = useContext(QuizContext);
    const [username, setUsername] = useState(user?.username);
    const [status, setStatus] = useState<'loading'|'error'|'idle'>('idle');

    const handleUserUpdate = async () => {
        if(!username || !user || !dispatch) return;
        if(username.length <= 1 || 10 < username.length) {
            setStatus('error');
            return;
        }
        setStatus('loading');
        const updatedUser = await updateUser({
            body: {
                ...user,
                username
            },
            accessToken,
            userId: user.id
        });
        revalidate('user');
        revalidate('ranking');
        dispatch({type: 'SET_USER', payload: updatedUser});
        setStatus('idle');
    }

    const usernameLength = username ? username.length : 0;

    return (
        <div className="space-y-3">
            <div className="text-secondary-900 font-bold">
                닉네임 변경&nbsp;
                <span className={`font-normal text-sm ${usernameLength > 10 ? 'text-error' : ''}`}>({usernameLength}/10)</span>
            </div>
            <div className="flex space-x-2">
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className={status === 'error' ? `border-error` : ''}
                />
                <Button
                    context="변경"
                    className="w-20"
                    onClick={handleUserUpdate}
                    disable={status==='loading'}
                />
            </div>
        </div>
    )
}

export const GoalEdit = () => {
    const {user, dispatch, accessToken} = useContext(QuizContext);
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
                <div className="text-secondary-400">하루 {user?.dailyTarget}개</div>
                <Downarrow/>
            </div>
            <Modal onClose={closeModal} open={isModalOpen}>
                <GoalEditModal user={user} dispatch={dispatch} accessToken={accessToken} closeModal={closeModal}/>
            </Modal>
        </div>
    )
}

const GoalEditModal = ({user, dispatch, accessToken, closeModal}: QuizContextType & {closeModal: () => void}) => {

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
            <GoalEditItem title="캐주얼" goalCount={5} user={user} update={update} accessToken={accessToken} closeModal={closeModal}/>
            <GoalEditItem title="보통" goalCount={10} user={user} update={update} accessToken={accessToken} closeModal={closeModal}/>
            <GoalEditItem title="열심히" goalCount={20} user={user} update={update} accessToken={accessToken} closeModal={closeModal}/>
            <GoalEditItem title="하드코어" goalCount={40} user={user} update={update} accessToken={accessToken} closeModal={closeModal}/>
        </div>
    )
}

type GoarEditItem = {
    title: string,
    goalCount: number,
    user: UserInfo,
    update: (user: UserInfo) => void,
    closeModal: () => void
} & AccessToken;

const GoalEditItem = ({title, goalCount, user, update, accessToken, closeModal}: GoarEditItem) => {
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
            closeModal();
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