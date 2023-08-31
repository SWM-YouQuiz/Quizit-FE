import Navbar from "@/components/Navbar";
import {ReactNode} from "react";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex-grow relative max-h-[calc(100dvh-64px)]">
            <Navbar/>
        </div>
    )
}

export default Layout;