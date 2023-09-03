import React from "react";
import {cn} from "@/util/tailwind";

type InputProps = {
    className?: string
}
const Input = ({className="", ...props}: InputProps) => {
    return (
        <input
            type="text"
            className={cn("w-full h-12 rounded-lg border-2 border-neutral-200 px-4 text-secondary-900", className)}
            {...props}
        />
    )
}

export default Input;