"use client"

import React, {InputHTMLAttributes} from 'react';
import {FieldError, FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>
}

function Input({ label, name, type = "text", register, errors, ...props }: InputProps) {
    return (
        <div className="flex flex-col">
            <input
                className={`h-12 border-2 rounded shadow-lg shadow-bg-primary px-2 ${errors[name]?.type === "required" && "border-error"}`}
                type={type}
                placeholder={label}
                {...register(name)}
                aria-invalid={errors[name] ? "true" : "false"}
                {...props}
            />
        </div>

    );
}


export default Input;