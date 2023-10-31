"use client";
import { ReactNode, useEffect } from "react";

const QuizTouchEventHandler = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        const touchStartHandler = () => {
            // 터치 시작 시점의 상태를 저장
        };

        const touchMoveHandler = (event: TouchEvent) => {
            // 이벤트가 발생한 요소가 <pre> 태그인지 확인합니다.
            if (event.target instanceof HTMLElement) {
                const element = event.target;

                // <pre> 태그 내부에서 발생한 이벤트인 경우 기본 동작을 허용합니다.
                if (element.closest("pre")) {
                    return;
                }
            }

            // 그 외의 경우에는 기본 이벤트 처리를 방지합니다.
            event.preventDefault();
        };

        document.addEventListener("touchstart", touchStartHandler, {
            passive: false,
        });
        document.addEventListener("touchmove", touchMoveHandler, {
            passive: false,
        });

        // 컴포넌트가 Unmount될 때 이벤트 리스너를 정리하는 Cleanup 함수입니다.
        return () => {
            document.removeEventListener("touchstart", touchStartHandler);
            document.removeEventListener("touchmove", touchMoveHandler);
        };
    }, []);

    return <>{children}</>;
};

export default QuizTouchEventHandler;
