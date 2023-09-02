"use client"
import {Downarrow} from "@/components/svgs";
import React, {useState} from "react";
import Modal from "@/components/ui/Modal"

export const NicknameEdit = () => {
    return (
        <div className="space-y-3">
            <div className="text-secondary-900 font-bold">닉네임 변경</div>
            <input type="text" className="w-full h-12 rounded-lg border-2 border-neutral-200 px-4 text-secondary-900"/>
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

const GoalEditModal = () => (
    <div className="flex flex-col space-y-2.5 overflow-auto">
        <GoalEditItem title="캐주얼" goalCount={5}/>
        <GoalEditItem title="보통" goalCount={10}/>
        <GoalEditItem title="열심히" goalCount={20}/>
        <GoalEditItem title="하드코어" goalCount={40}/>
    </div>
)

const GoalEditItem = ({title, goalCount}: {title: string, goalCount: number}) => (
    <div className="flex justify-between p-5 rounded-xl border-[1px] shadow">
        <div className="text-secondary-900">{title}</div>
        <div className="text-secondary-800 text-[13px]">하루 {goalCount}문제 이상</div>
    </div>
)