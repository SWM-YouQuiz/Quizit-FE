
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {KakaoLoginButton} from "@/components/social_buttons/kakao_login_button";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

const getSession = async () => {
    return await getServerSession(authOptions);
}
const Login = async () => {
    const session = await getSession();
    if(session?.user?.token) {
        redirect("/home");
    }

    return (
        <div className="container mx-auto h-screen p-8 flex flex-col justify-between items-center">
            {JSON.stringify(session)}
            <div className="w-full mt-32 flex flex-col items-center">
                <h1 className="font-sans font-extrabold text-6xl">You Quiz!</h1>
            </div>
            <div className="w-full mb-20 flex flex-col justify-between items-center space-y-4">
                <KakaoLoginButton />
                {/*<button className="w-full h-12 rounded-[12px] bg-[#FEE500]">카카오로 로그인</button>*/}
            </div>
        </div>

    )
}

export default Login;