"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionDiv = ({ children, className = "" }: { children: ReactNode; className: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MotionDiv;
