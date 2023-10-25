"use client"
import React, {forwardRef, ForwardRefRenderFunction} from "react";
import {cn} from "@/util/tailwind";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}
const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({className="", ...props}, ref) => {
    return (
        <input
            ref={ref}
            type="text"
            className={cn("w-full h-12 rounded-lg border-2 border-neutral-200 px-4 text-secondary-900", className)}
            {...props}
        />
    )
}

export default forwardRef(Input);
