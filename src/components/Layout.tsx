"use client"
import Navbar from "@/components/Navbar";
import {ReactNode} from "react";
import {cn} from "@/util/tailwind";

type LayoutProps = {
    children: ReactNode,
    navbar?: boolean
}

const Layout = ({children, navbar=true}: LayoutProps) => {
    const height = navbar ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh)]";

    return (
        <>
            <div className={cn("flex-grow relative pb-[env(safe-area-inset-bottom)]", height)}>
                {children}
            </div>
            {navbar && <Navbar/>}
        </>
    )
}

export default Layout;