"use client";
import { BackArrow } from "@/components/svgs";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={(e) => {
                router.back();
            }}
        >
            <BackArrow />
        </button>
    );
};

export default BackButton;
