import Ready from "@/components/Ready";
import {Header} from "@/components/Header";
import {Setting} from "@/components/svgs";

const ProfilePage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">프로필</div>
                <Setting/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5">
                <Ready/>
            </div>
        </div>
    )
}

export default ProfilePage;