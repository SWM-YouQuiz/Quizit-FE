"use client"

import React, { InputHTMLAttributes, ForwardRefRenderFunction, forwardRef } from 'react';
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {default as InputComponent} from "@/components/ui/Input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({ label, name, register, errors, ...props }, ref) => {
        return (
            <div className="flex flex-col w-full space-y-1">
                <div className="flex justify-between">
                    <div className="text-[13px] font-semibold">{label}</div>
                    {
                        errors[name] && (
                            <div className="flex h-fit items-center text-xs text-error">
                                {`⚠ ${errors[name]?.message}`}
                            </div>
                        )
                    }
                </div>

                <InputComponent
                    className={errors[name]?.type === "required" ? "" : ""}
                    aria-invalid={errors[name] ? "true" : "false"}
                    {...register(name)}
                    {...props}
                />

            </div>
        );
    }

export default forwardRef(Input);
