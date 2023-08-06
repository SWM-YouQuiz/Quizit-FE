import Link from "next/link";
import BodyContainer from "@/app/auth/register/allow-push/body-container";

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
            <Link className="text-sm" href={"/auth/register/nickname-password"}>
                이전
            </Link>
        </div>
        <div className="flex justify-center text-xl font-bold p-4">목표를 위해 푸시 알림을 받아보세요.</div>
    </div>
)

export default RegisterEmail;