"use client";

import { deleteToken } from "@/modules/serverActions";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const router = useRouter();

    return (
        <button
            className="block"
            onClick={() => {
                deleteToken();
                router.replace("/auth/login");
            }}
        >
            로그아웃
        </button>
    );
};

export default SignOutButton;
