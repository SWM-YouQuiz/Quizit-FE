"use client"
import {SubmitHandler, useFormContext} from "react-hook-form";
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";
import {loginApi, registerApi} from "@/modules/auth/serverApiActions";
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
            allowPush: data.allowPush,
            dailyTarget: 10,
            image: ""
        })
    }
    const checkValidAccess = () => {
        if(!isValid) {
            router.replace("/");
        }
    }

    const login = async () => {
        const username = getValues("username");
        const password = getValues("password");
        await signIn("credentials", {
            username: username,
            password: password,
            callbackUrl: `${window.location.origin}`,
            redirect: false
        });
        router.replace("/onboarding/0");
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
            <Button className="w-full" context={"알겠어요"} disable={!isValid} onClick={handleAllow}/>
            <Button className="w-full bg-secondary-200" context={"다음에 설정할게요"} disable={!isValid} onClick={handleDisAllow}/>
        </div>
    )
}

export default BodyContainer;