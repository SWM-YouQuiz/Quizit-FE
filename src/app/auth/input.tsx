"use client"

import React, { InputHTMLAttributes, ForwardRefRenderFunction, forwardRef } from 'react';
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {default as InputComponent} from "@/components/ui/Input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({ label, name, type = "text", register, errors, ...props }, ref) => {
        return (
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="text-xs">{label}</div>
                    {
                        errors[name] && (
                            <div className="flex h-fit items-center text-xs text-error">
                                {`⚠ ${errors[name]?.message}`}
                            </div>
                        )
                    }
                </div>

                <InputComponent
                    className={errors[name]?.type === "required" ? "border-error" : ""}
                    {...register(name)}
                    aria-invalid={errors[name] ? "true" : "false"}
                    {...props}
                />
            </div>
        );
    }

export default forwardRef(Input);
