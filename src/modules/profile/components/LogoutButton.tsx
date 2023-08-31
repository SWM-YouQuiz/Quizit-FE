"use client"
import {Rightarrow} from "@/components/svgs";
import {signOut} from "next-auth/react";

const LogoutButton = () => (
    <div
        className="flex justify-between items-center h-[52px]"
        onClick={() => {signOut()}}
    >
        <div className="text-[17px] text-secondary-900">로그아웃</div>
        <Rightarrow/>
    </div>
)

export default LogoutButton;