"use client"

import React, {forwardRef, ForwardRefRenderFunction, InputHTMLAttributes} from 'react';
import {FieldErrors, UseFormRegister} from "react-hook-form";
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
                    <div className="text-[13px] font-semibold text-white">{label}</div>
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
