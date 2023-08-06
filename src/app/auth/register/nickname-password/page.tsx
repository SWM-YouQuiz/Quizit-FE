import Link from "next/link";
import BodyContainer from "@/app/auth/register/nickname-password/body-container";

const RegisterNicknamePassword = () => {
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
            <Link className="text-sm" href={"/auth/register/email"}>
                이전
            </Link>
        </div>
        <div className="flex justify-center text-xl font-bold p-4">닉네임과 비밀번호를 입력해주세요.</div>
    </div>
)

export default RegisterNicknamePassword;