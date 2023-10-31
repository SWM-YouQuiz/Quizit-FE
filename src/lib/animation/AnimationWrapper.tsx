"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export const AnimationWrapper = ({ children }: { children: ReactNode }) => <AnimatePresence>{children}</AnimatePresence>;
