"use client"
import Navbar from "@/components/Navbar";
import {ReactNode, useEffect} from "react";
import {cn} from "@/util/tailwind";

type LayoutProps = {
    children: ReactNode,
    navbar?: boolean
}

const Layout = ({children, navbar=true}: LayoutProps) => {
    const height = navbar ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh)]";

    useEffect(() => {
        const touchStartHandler = () => {
            // 터치 시작 시점의 상태를 저장
        };

        const touchMoveHandler = (event: TouchEvent) => {
            // 필요에 따라 기본 이벤트 처리 방지
            event.preventDefault();
        };

        document.addEventListener('touchstart', touchStartHandler, { passive: false });
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });

        // Component가 Unmount될 때 EventListener를 정리해주는 Cleanup 함수
        return () => {
            document.removeEventListener('touchstart', touchStartHandler);
            document.removeEventListener('touchmove', touchMoveHandler);
        };
    }, []);

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