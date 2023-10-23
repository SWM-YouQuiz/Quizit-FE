"use client"
import {useFormContext} from "react-hook-form";
import Input from "@/app/auth/input";
import NextButton from "@/app/auth/register/next-button";

const BodyContainer = () => {
    const { register, watch, formState: {errors, isValid} } = useFormContext<RegisterInputs>()

    return (
        <div className="flex flex-col w-full items-center space-y-2 p-4">
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
            <NextButton href={"/auth/register/nickname-password"} context={"다음"} disable={!isValid}/>
        </div>
    )
}

export default BodyContainer;