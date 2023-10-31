import { Header } from "@/components/Header";
import { GoalEdit, NicknameEdit } from "@/modules/profile/Edits";
import BackButton from "@/components/BackButton";
import React from "react";

const MyPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <BackButton />
                <div className="font-bold">마이페이지</div>
                <div />
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-white">
                <BodyContainer />
            </div>
        </div>
    );
};

export default MyPage;

const BodyContainer = () => {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="space-y-8">
                <NicknameEdit />
                <GoalEdit />
            </div>
        </div>
    );
};
