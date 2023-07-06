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

    // fixed position인 header특성상 아래에 배치되는 요소들이 header에 가려지기 때문에 relative 요소를 겹치게 하였음.
    // fixed 요소는 스크롤에도 반응하지 않아 header를 fixed position으로 설정해야 함.
    return (
        <>
            <div className="fixed top-0 h-10 w-full flex justify-center items-center bg-bg-primary z-50">
                <button className="absolute left-4" onClick={() => handleClick()}>back</button>
                <h1 className="text-lg">퀴즈</h1>
            </div>

            <div className="relative top-0 h-10 w-full z-0">

            </div>
        </>

    )
}

export default Header;