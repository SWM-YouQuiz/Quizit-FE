import {Header} from "@/components/Header";
import {BackArrow} from "@/components/svgs";
import Link from "next/link";
import Ready from "@/components/Ready";

const MyPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/profile">
                    <BackArrow/>
                </Link>
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