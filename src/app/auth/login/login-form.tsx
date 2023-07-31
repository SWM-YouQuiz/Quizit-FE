"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import {signIn} from "next-auth/react";
import Input from "@/app/auth/input";

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
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        console.log("onSubmit",data);
        await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: true,
            callbackUrl: "/"
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 flex flex-col">
            <Input
                placeholder="username"
                register={register}
                name={"username"}
                errors={errors}
                aria-invalid={errors.username ? "true" : "false"}
            />
            <Input
                placeholder="password"
                register={register}
                name={"password"}
                type="password"
                errors={errors}
                aria-invalid={errors.password ? "true" : "false"}
            />

            <input className="h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-center px-4 my-1 text-sm text-white bg-primary" type="submit" />
        </form>
    )
}

export default LoginForm;