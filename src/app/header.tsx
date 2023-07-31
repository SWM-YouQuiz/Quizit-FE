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
    if(currentPathName === "/auth/login") return null;
    return (
        <>
            <div className="sticky top-0 h-10 w-full flex justify-center items-center bg-bg-primary z-50">
                <button className="absolute left-4" onClick={() => handleClick()}>back</button>
                <h1 className="text-lg">{currentPathName}</h1>
            </div>
        </>
    )
}

export default Header;