"use client"
import {usePathname, useRouter} from "next/navigation";

// TODO: currentPathName에 따라 Header의 이름 또한 변경해야함.
const Header = () => {
    const currentPathName = usePathname();
    const route = useRouter()
    const handleClick = () => {
        route.back();
    }

    return (
        <div className="fixed top-0 h-10 w-full flex justify-center items-center bg-bg-primary">
            <button className="absolute left-4" onClick={handleClick}>back</button>
            <h1 className="text-lg">퀴즈</h1>
        </div>
    )
}

export default Header;