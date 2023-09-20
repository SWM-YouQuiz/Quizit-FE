"use client"
import {Share} from "@/components/svgs";
import React from "react";

const ShareButton = () => {
    const handleClick = () => {
        alert(JSON.stringify(navigator.share))
        if (navigator.share) {
            navigator.share({
                title: "Quiz IT",
                text: "Quiz IT에서 퀴즈를 해결해보세요.",
                url: window.location.href,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert("클립보드에 링크가 복사되었습니다.")
                })
        }
    }

    return (
        <button type="button" onClick={handleClick}>
            <Share/>
            <p>hello</p>
        </button>
    )
}

export default ShareButton;