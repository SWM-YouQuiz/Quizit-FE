"use client";
import { motion } from "framer-motion";
import { cn } from "@/util/tailwind";

const Tag = ({ name, toggle, handleToggle, text, icon }: ToggleButton) => {
    return (
        <motion.button
            type="button"
            name={name}
            onClick={handleToggle}
            className={cn(
                "inner-border-2 h-8 rounded-lg text-secondary-900 flex justify-between px-3 items-center w-15 bg-white",
                toggle ? "inner-border-point1 text-point1 stroke-point1" : "inner-border-secondary-400 stroke-secondary-400 text-secondary-400",
            )}
            whileTap={{ scale: 0.95, rotate: [0, 10, -20] }}
            transition={{ type: "spring", bounce: 0.4 }}
        >
            <div className="flex">
                {icon}
                <p className="text-center">{text}</p>
            </div>
        </motion.button>
    );
};

export default Tag;
