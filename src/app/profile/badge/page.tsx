import {Header} from "@/components/Header";
import Ready from "@/components/Ready";
import BackButton from "@/components/BackButton";
import React from "react";

const MyPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <BackButton/>
                <div className="font-bold">프로필</div>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-white">
                <BodyContainer/>
            </div>
        </div>
    )
}

export default MyPage;

const BodyContainer = () => {
    return (
        <Ready />
    )
}