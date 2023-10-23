"use client"

import {SubmitHandler, useForm} from "react-hook-form"
import {signIn} from "next-auth/react";
import Input from "@/app/auth/input";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Inputs = {
    email: string
    password: string
}

const googleImgSrc =`${process.env.NEXT_PUBLIC_SERVICE_URL}/oauth/btn_google_signin_light_normal_web@2x.png`;
const kakaoImgSrc = `${process.env.NEXT_PUBLIC_SERVICE_URL}/oauth/kakao_login_medium_narrow.png`;

const googleOAuthUrl = `https://quizit.org/api/auth/oauth2/authorization/google`;
const kakaoOAuthUrl = `https://quizit.org/api/auth/oauth2/authorization/kakao`;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const user = await signIn("credentials", {
            email: data.email,
            password: data.password,
            type: "-1",
            callbackUrl: `${window.location.origin}`,  // 현재 페이지로 리다이렉트
            redirect: false  // 리다이렉트 방지
        });

        if (user?.error) {  // user 객체의 error 프로퍼티 확인
            setErrorMessage(user.error);  // 에러 메시지 설정
        } else {
            router.replace("/curriculum");
        }
    }

    const email = watch("email", "");
    const password = watch("password", "");

    const checkDisable = () => {
        return email === "" || password === "";
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 flex flex-col">
            {
                errorMessage && (
                    <div className="flex h-fit items-center text-xs text-error">
                        {`⚠ ${errorMessage}`}
                    </div>
                )
            }

            <Input
                label="이메일"
                register={register}
                errors={errors}
                {...register("email", {
                    required: "required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식이 맞지 않습니다."
                    }
                })}
                aria-invalid={errors.email ? "true" : "false"}
            />
            <Input
                label="비밀번호"
                register={register}
                name={"password"}
                type="password"
                errors={errors}
                aria-invalid={errors.password ? "true" : "false"}
            />
            <input
                className={`rounded-xl h-12 flex items-center justify-center px-4 text-base text-white
                ${checkDisable() ? "bg-secondary-200" : "bg-secondary-900"}`}
                type="submit"
                disabled={checkDisable()}
                value="로그인"
            />
            <Link href={googleOAuthUrl} prefetch={false}>
                <Image
                    src={googleImgSrc}
                    alt="구글 로그인 버튼 이미지"
                    width={160}
                    height={10}
                />
            </Link>
            <Link href={kakaoOAuthUrl} prefetch={false}>
                <Image
                    src={kakaoImgSrc}
                    alt="카카오 로그인 버튼 이미지"
                    width={160}
                    height={10}
                />
            </Link>
            <div className="flex justify-end text-sm">
                <Link href="/auth/register/email" className="text-primary-900">&nbsp;회원가입</Link>
            </div>
        </form>
    )
}

export default LoginForm;
