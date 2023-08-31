import Navbar from "@/components/Navbar";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode,
    navbar?: boolean
}

const Layout = ({children, navbar=true}: LayoutProps) => {
    const maxh = navbar ? "calc(100dvh-64px)" : "calc(100dvh)"

    return (
        <div className={`flex-grow relative max-h-[${maxh}]`}>
            {children}
            {navbar && <Navbar/>}
        </div>
    )
}

export default Layout;