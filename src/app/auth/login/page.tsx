import LoginForm from "@/app/auth/login/login-form";
import Link from "next/link";
import {SplashMarkDark} from "@/components/svgs";
import Image from "next/image";

const Login = async () => {
    return (
        <div className="flex flex-col justify-between w-full h-full items-center">
           <HeaderContainer/>
            <BodyContainer/>
        </div>
    )
}

const HeaderContainer = () => {
    return (
        <div className="flex-grow grid place-items-center">
            <Image
                src="/characters/splash-mark-light.svg"
                alt="퀴즈보 로고"
                width={208}
                height={129}
            />
        </div>
    )
}

const BodyContainer = () => {
    return (
        <div className="w-full p-8">
            <LoginForm/>
        </div>
    )
}

export default Login;