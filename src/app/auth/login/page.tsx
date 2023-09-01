import LoginForm from "@/app/auth/login/login-form";
import Link from "next/link";

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
        <div className="flex-grow flex items-center justify-center">Quiz IT</div>
    )
}

const BodyContainer = () => {
    return (
        <div className="w-full p-8">
            <LoginForm/>
            <div className="flex justify-end text-sm">
                <span>처음 오셨나요?</span>
                <Link href="/auth/register/email" className="text-primary" replace={true}>&nbsp;회원가입</Link>
            </div>
        </div>
    )
}

export default Login;