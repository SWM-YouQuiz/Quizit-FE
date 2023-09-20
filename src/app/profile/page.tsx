import {Header} from "@/components/Header";
import {Rightarrow, Setting} from "@/components/svgs";
import Image from "next/image";
import CalendarHeatmapComponent from "@/modules/profile/CalendarHeatmap";
import Link from "next/link";
import Menu from "@/modules/profile/Menu";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";

const ProfilePage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">프로필</div>
                <Setting/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-white">
                <BodyContainer/>
            </div>
        </div>
    )
}

const BodyContainer = () => {
    return (
        <div className="space-y-6">
            <ProfileCard/>
            <CalendarHeatmapComponent/>
            <Menu/>
        </div>
    )
}

const ProfileCard = async () => {
    const session = await getServerSession(authOptions);

    return (
        <Link
            className="flex space-x-3"
            href="profile/badge"
        >
            <div className="grid place-items-center border border-neutral-100 w-18 h-18 rounded-full">
                <Image
                    src={"next.svg"}
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
                        하루 목표 {session?.user.user.dailyTarget}개
                    </div>
                </div>
                <Rightarrow className="self-center"/>
            </div>
        </Link>
    )
}

export default ProfilePage;