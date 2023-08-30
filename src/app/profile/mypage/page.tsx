import {Header} from "@/components/Header";
import {BackArrow, Rightarrow, Setting} from "@/components/svgs";
import Image from "next/image";
import CalendarHeatmap from "@/modules/profile/CalendarHeatmap";
import CalendarHeatmapComponent from "@/modules/profile/CalendarHeatmap";
import Menu from "@/app/profile/menu";
import Link from "next/link";
import {GoalEdit, NicknameEdit} from "@/app/profile/mypage/edits";

const MyPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/profile">
                    <BackArrow/>
                </Link>
                <div className="font-bold">마이페이지</div>
                <div/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5">
                <BodyContainer/>
            </div>
        </div>
    )
}

export default MyPage;

const BodyContainer = () => {
    return (
        <div className="space-y-8">
            <NicknameEdit/>
            <GoalEdit/>
        </div>
    )
}