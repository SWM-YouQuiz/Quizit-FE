"use client"

import {usePathname, useRouter} from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const route = useRouter()
    const handleClick = () => {
        route.back();
    }
    return (
        <div className="fixed top-0 h-10 w-full flex justify-center align-middle border-b-2 border-gray-400 bg-pink-300">
            <button className="absolute left-4" onClick={handleClick}>back</button>
            <h1 className="text-xl">{pathname}</h1>
        </div>
    )
}

export default Header;