import { Header } from "@/components/Header";
import { Setting } from "@/components/svgs";
import Menu from "@/modules/profile/Menu";
import ProfileCard from "@/modules/profile/components/ProfileCard";
import Link from "next/link";

const ProfilePage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="hidden" />
                <div className="font-bold">프로필</div>
                <Link href="/profile/setting">
                    <Setting />
                </Link>
            </Header>
            <div className="flex-grow overflow-y-auto py-5 bg-white">
                <BodyContainer />
            </div>
        </div>
    );
};

const BodyContainer = () => {
    return (
        <div className="space-y-6">
            <ProfileCard />
            {/*<CalendarHeatmapComponent/>*/}
            <Menu />
        </div>
    );
};

export default ProfilePage;
