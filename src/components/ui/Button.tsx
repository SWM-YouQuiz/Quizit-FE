"use client"

import {cn} from "@/util/tailwind";
import {motion} from "framer-motion";

type ButtonProps = {
    disable?: boolean,
    context: string,
    className?: string,
    onClick?: () => void
}
const Button = ({disable=false, context, className="", onClick}: ButtonProps) => {
    return (
        <motion.button
            type="button"
            className={cn(`rounded-xl h-12 flex items-center justify-center px-4 text-base text-white bg-point1
                ${disable ? "bg-bg-secondary" : "bg-point1"}`, className)}
             onClick={(e) => {
                 disable && e.preventDefault();
                 onClick && onClick()
             }}
            whileTap={{ scale: 0.95 }}
        >
            {context}
        </motion.button>
    )
}

export default Button;