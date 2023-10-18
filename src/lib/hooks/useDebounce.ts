// useDebounce.ts
import { useState, useEffect } from 'react';

// 콜백과 딜레이를 인자로 받는 커스텀 훅
export const useDebounce = (callback: Function, delay: number) => {
    // 디바운스 상태를 관리할 state
    const [isWaiting, setIsWaiting] = useState(false);

    // 디바운스 함수를 호출하는 래퍼 함수
    const call = (...args: any) => {
        if (!isWaiting) { // 대기 중이 아닐 때만 콜백 호출
            callback(...args);
            setIsWaiting(true);
            setTimeout(() => {
                setIsWaiting(false);
            }, delay);
        }
    };

    // 컴포넌트가 언마운트되거나 delay가 변경되면 타이머를 클리어
    useEffect(() => {
        return () => {
            setIsWaiting(false);
        };
    }, [delay]);

    return { call, isWaiting }; // 다른 곳에서 사용할 수 있도록 call 함수와 isWaiting 상태 반환
};
