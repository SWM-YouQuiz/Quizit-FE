"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import {signIn} from "next-auth/react";
import Input from "@/app/auth/input";
import {registerApi} from "@/modules/auth/apiServices";
import {useState} from "react";

type Inputs = {
    username: string
    password: string
    passwordComfirm: string
    nickname: string
    allowPush: boolean
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState("");
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        console.log("data",data);
        const response = registerApi({
            username: data.username,
            password: data.password,
            nickname: data.nickname,
            allowPush: data.allowPush
        })
            .then(r => r.json())
            .then(json => console.log("r", json))
            .catch(e => console.log("register error", e));
    }

    const username = watch("username", "");
    const password = watch("password", "");
    const passwordConfirm = watch("passwordComfirm", "");
    const nickname = watch("nickname", "");

    const checkDisable = () => {
        return username === "" || password === "" || passwordConfirm === "" || nickname === "";
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 flex flex-col">
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
                name="password"
                type="password"
                errors={errors}
                aria-invalid={errors.password ? "true" : "false"}
            />
            <Input
                label="비밀번호 확인"
                register={register}
                type="password"
                errors={errors}
                {...register("passwordComfirm", {
                    required: "required",
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "비밀번호가 일치하지 않습니다.";
                        }
                    }
                })}
                aria-invalid={errors.passwordComfirm ? "true" : "false"}
            />
            <Input
                label="닉네임"
                register={register}
                name="nickname"
                errors={errors}
                aria-invalid={errors.passwordComfirm ? "true" : "false"}
            />
            <label className="flex justify-end items-center space-x-4">
                <div className="text-sm">푸시 알림 허용</div>
                <input
                    type="checkbox"
                    {...register("allowPush")}
                />
            </label>
            <input
                className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center 
                justify-center px-4 text-sm text-white
                ${checkDisable() ? "bg-bg-secondary" : "bg-primary"}`}
                type="submit"
                disabled={checkDisable()}
                value="회원가입"
            />
        </form>
    )
}

export default RegisterForm;