import { Header } from "@/components/Header";
import React, { ReactNode } from "react";
import Item from "@/modules/profile/components/Item";
import LogoutButton from "@/modules/profile/components/LogoutButton";
import AccountDeletionButton from "@/modules/profile/components/AccountDeletionButton";
import BackButton from "@/components/BackButton";

const Setting = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <BackButton />
                <div className="font-bold">설정</div>
                <div />
            </Header>
            <div className="flex-grow overflow-y-auto py-5 bg-secondary-50">
                <BodyContainer />
            </div>
        </div>
    );
};

const BodyContainer = () => {
    return (
        <div className="space-y-6">
            <div>
                <Label>서비스 정보</Label>
                <Item title="개인정보 처리방침" href="https://sw-maestro-14.notion.site/3f4b216059074bb686811ce860a273db?pvs=4" />
                <Item title="디스코드 커뮤니티" href="https://discord.gg/ZYew8Ut2dF" />
                <Item title="버전정보" href="">
                    <p className="text-secondary-900">0.1.0</p>
                </Item>
            </div>

            <div>
                <Label>계정</Label>
                <div className="space-y-1">
                    <LogoutButton />
                    <AccountDeletionButton />
                </div>
            </div>
        </div>
    );
};

const Label = ({ children }: { children: ReactNode }) => <p className="text-sm text-secondary-800 p-2.5">{children}</p>;

export default Setting;
