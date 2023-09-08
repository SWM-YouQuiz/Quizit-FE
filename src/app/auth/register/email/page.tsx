import Link from "next/link";
import BodyContainer from "@/app/auth/register/email/body-container";

const RegisterEmail = () => {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <HeadContainer/>
            <BodyContainer/>
        </div>
    )
}

const HeadContainer = () => (
    <div className="flex flex-col w-full">
        <div className="relative flex justify-between">
            <Link className="text-sm" href="/auth/login">
                취소
            </Link>
        </div>
        <div className="flex justify-center text-xl font-bold p-4">이메일을 입력해주세요.</div>
    </div>
)

export default RegisterEmail;