"use client"
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

// TODO: currentPathName에 따라 Header의 이름 또한 변경해야함.
const Header = () => {
    const currentPathName = usePathname();
    const route = useRouter()

    const handleClick = () => {
        console.log("hello")
        route.back();
    }

    return (
        <>
            <div className="sticky top-0 h-10 w-full flex justify-center items-center bg-bg-primary z-50">
                <button className="absolute left-4" onClick={() => handleClick()}>back</button>
                <h1 className="text-lg">퀴즈</h1>
            </div>
        </>
    )
}

export default Header;