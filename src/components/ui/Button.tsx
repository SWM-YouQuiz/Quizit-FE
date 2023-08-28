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
        <div className={cn(`rounded-xl h-12 flex items-center justify-center px-4 text-base text-white bg-point1
                ${disable ? "bg-bg-secondary" : "bg-point1"}`, className)}
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