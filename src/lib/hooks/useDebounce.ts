import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (callback: Function, delay: number, optimisticCallback?: Function) => {
    // 타이머 ID를 저장할 state
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const memoizedCallback = useCallback(callback, []);

    // 디바운스 함수를 호출하는 래퍼 함수
    const call = (...args: any) => {
        optimisticCallback && optimisticCallback();
        // 기존 타이머가 있다면 취소
        if (timerId?.current) {
            clearTimeout(timerId.current);
        }

        // 새 타이머 설정
        timerId.current = setTimeout(() => {
            memoizedCallback(...args);
        }, delay);
    };

    // 컴포넌트가 언마운트되면 타이머를 클리어
    useEffect(() => {
        return () => {
            if (timerId?.current) {
                clearTimeout(timerId.current);
            }
        };
    }, []);

    return { call };
};
