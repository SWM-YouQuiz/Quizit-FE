"use client"
import {SubmitHandler, useFormContext} from "react-hook-form";
import Input from "@/app/auth/input";
import NextButton from "@/app/auth/register/next-button";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";
import {loginApi, registerApi} from "@/modules/auth/apiServices";
import {signIn} from "next-auth/react";

const BodyContainer = () => {
    const {
        setValue,
        getValues,
        handleSubmit,
        formState: {errors, isValid},
        setError,
    } = useFormContext<RegisterInputs>()
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterInputs> = async (data: RegisterInputs) => {
        return registerApi({
            username: data.username,
            password: data.password,
            nickname: data.nickname,
            allowPush: data.allowPush
        })
    }
    const checkValidAccess = () => {
        if(!isValid) {
            router.replace("/");
        }
    }

    const login = async () => {
        console.log("here");
        const username = getValues("username");
        const password = getValues("password");
        await signIn("credentials", {
            username: username,
            password: password,
            callbackUrl: `${window.location.origin}`,  // 현재 페이지로 리다이렉트
            redirect: false  // 리다이렉트 방지
        });
        router.replace("/");
    }

    const submit = async () => {
        handleSubmit(onSubmit)()
            .then(() => login())
            .catch((err: Error) => {
                console.log("register error", err.message);
                setError("username", {type: "conflict", message: "이미 존재하는 이메일입니다."});
                router.replace("/auth/register/email");
            })
    }

    const handleAllow = () => {
        setValue("allowPush", true);
        submit();
    }

    const handleDisAllow = () => {
        setValue("allowPush", false);
        submit();
    }

    return (
        <div className="flex flex-col w-full items-center space-y-2 p-4">
            <Button context={"알겠어요"} disable={!isValid} onClick={handleAllow}/>
            <Button context={"다음에 설정할게요"} disable={!isValid} className={"bg-bg-secondary"} onClick={handleDisAllow}/>
        </div>
    )
}

export default BodyContainer;