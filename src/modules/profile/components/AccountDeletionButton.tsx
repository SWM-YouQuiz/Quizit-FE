"use client"
import {Rightarrow} from "@/components/svgs";
import {signOut} from "@/modules/serverActions";
import {useRouter} from "next/navigation";

const AccountDeletionButton = () => {
    const router = useRouter();

    return (
        <div
            className="flex justify-between items-center h-[52px] px-5 bg-white"
            onClick={() => {
                signOut();
                router.replace("/auth/login");
            }}
        >
            <div className="text-[17px] text-secondary-900">회원 탈퇴</div>
            <Rightarrow/>
        </div>
    )
}

export default AccountDeletionButton;