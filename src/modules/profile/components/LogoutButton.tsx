"use client";
import { Rightarrow } from "@/components/svgs";
import { deleteToken } from "@/modules/serverActions";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    return (
        <div
            className="flex justify-between items-center h-[52px] px-5 bg-white"
            onClick={() => {
                deleteToken();
                router.replace("/auth/login");
            }}
        >
            <div className="text-[17px] text-secondary-900">로그아웃</div>
            <Rightarrow />
        </div>
    );
};

export default LogoutButton;
