"use client"
import {useFormContext} from "react-hook-form";
import Input from "@/app/auth/input";
import NextButton from "@/app/auth/register/next-button";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const BodyContainer = () => {
    const { register, watch, formState: {errors, isValid} } = useFormContext<RegisterInputs>()

    return (
        <div className="flex flex-col w-full items-center space-y-2 p-4">
            <Input
                label="닉네임"
                register={register}
                errors={errors}
                {...register("nickname", {
                    required: "required"
                })}
                aria-invalid={errors.username ? "true" : "false"}
            />
            <Input
                label="비밀번호"
                register={register}
                errors={errors}
                type={"password"}
                {...register("password", {
                    required: "required"
                })}
                aria-invalid={errors.username ? "true" : "false"}
            />
            <NextButton href={"/auth/register/allow-push"} context={"다음"} disable={!isValid}/>
        </div>
    )
}

export default BodyContainer;