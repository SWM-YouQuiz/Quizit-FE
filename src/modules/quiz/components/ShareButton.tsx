"use client";
import { Share } from "@/components/svgs";
import React from "react";

const ShareButton = () => {
    const handleClick = () => {
        const url = window.location.href;

        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);

        tempInput.select();
        tempInput.setSelectionRange(0, 99999);

        try {
            const successful = document.execCommand("copy");
            const msg = successful ? "successful" : "unsuccessful";
            alert("클립보드에 링크가 복사되었습니다.");
        } catch (err) {
            console.log("Unable to copy the URL, error: ", err);
        }

        // 임시 요소를 제거합니다.
        document.body.removeChild(tempInput);
    };

    return (
        <button type="button" onClick={handleClick}>
            <Share />
        </button>
    );
};

export default ShareButton;
