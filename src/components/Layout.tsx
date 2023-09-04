"use client"
import Navbar from "@/components/Navbar";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode,
    navbar?: boolean
}

const Layout = ({children, navbar=true}: LayoutProps) => {
    return (
        <>
            <div className={`flex-grow relative h-[${navbar ? "calc(100dvh-64px)" : "calc(100dvh)"}] pb-[env(safe-area-inset-bottom)]`}>
                {children}
            </div>
            {navbar && <Navbar/>}
        </>
    )
}

export default Layout;