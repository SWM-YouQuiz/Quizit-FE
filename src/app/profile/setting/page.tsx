import {Header} from "@/components/Header";
import {ReactNode} from "react";
import Item from "@/modules/profile/components/Item";
import LogoutButton from "@/modules/profile/components/LogoutButton";
import AccountDeletionButton from "@/modules/profile/components/AccountDeletionButton";
import Link from "next/link";
import {BackArrow} from "@/components/svgs";

const Setting = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/profile">
                    <BackArrow/>
                </Link>
                <div className="font-bold">설정</div>
                <div />
            </Header>
            <div className="flex-grow overflow-y-auto py-5 bg-secondary-50">
                <BodyContainer/>
            </div>
        </div>
    )
}

const BodyContainer = () => {
    return (
        <div className="space-y-6">
            <div>
                <Label>서비스 정보</Label>
                <Item title="개인정보 처리방침" href="https://sw-maestro-14.notion.site/3f4b216059074bb686811ce860a273db?pvs=4"/>
                <Item title={"버전정보"} href="">
                    <p className="text-secondary-900">0.1.0</p>
                </Item>
            </div>

            <div>
                <Label>계정</Label>
                <LogoutButton/>
                <AccountDeletionButton/>
            </div>
        </div>
    )
}

const Label = ({children}: {children: ReactNode}) => (
    <p className="text-sm text-secondary-800 p-2.5">
        {children}
    </p>
)

export default Setting;