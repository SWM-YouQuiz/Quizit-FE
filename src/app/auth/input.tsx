"use client"

import React, {InputHTMLAttributes} from 'react';
import {FieldError, FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>
}

function Input({ placeholder, name, type = "text", register, errors, ...props }: InputProps) {
    return (
        <input
            className={`h-12 border-2 rounded shadow-lg shadow-bg-primary px-2 ${errors[name]?.type === "required" && "border-error"}`}
            placeholder={placeholder}
            type={type}
            {...register(name, { required: true })}
            aria-invalid={errors[name] ? "true" : "false"}
            {...props}
        />
    );
}


export default Input;