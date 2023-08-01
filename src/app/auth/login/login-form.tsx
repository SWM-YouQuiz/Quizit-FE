"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import {signIn} from "next-auth/react";
import Input from "@/app/auth/input";
import {useEffect, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import Button from "@/components/ui/Button";

type Inputs = {
    username: string
    password: string
}

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
            username: data.username,
            password: data.password,
            callbackUrl: `${window.location.origin}`,  // 현재 페이지로 리다이렉트
            redirect: false  // 리다이렉트 방지
        });

        if (user?.error) {  // user 객체의 error 프로퍼티 확인
            setErrorMessage(user.error);  // 에러 메시지 설정
        } else {
            router.replace("/");
        }
    }

    const username = watch("username", "");
    const password = watch("password", "");

    const checkDisable = () => {
        return username === "" || password === "";
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
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
                type={"email"}
                errors={errors}
                {...register("username", {
                    required: "required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식이 맞지 않습니다."
                    }
                })}
                aria-invalid={errors.username ? "true" : "false"}
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
                className={`h-12 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center 
                justify-center px-4 text-sm text-white
                ${checkDisable() ? "bg-bg-secondary" : "bg-primary"}`}
                type="submit"
                disabled={checkDisable()}
                value="로그인"
            />
        </form>
    )
}

export default LoginForm;
