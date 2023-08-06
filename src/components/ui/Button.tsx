"use client"

import {cn} from "@/util/tailwind";

type ButtonProps = {
    disable?: boolean,
    context: string,
    className?: string,
    onClick?: () => void
}
const Button = ({disable=false, context, className="", onClick}: ButtonProps) => {
    return (
        <div className={cn(`h-12 w-full border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center 
                justify-center px-4 text-sm text-white
                ${disable ? "bg-bg-secondary" : "bg-primary"}`, className)}
             onClick={(e) => {
                 disable && e.preventDefault();
                 onClick && onClick()
             }}
        >
            {context}
        </div>
    )
}

export default Button;