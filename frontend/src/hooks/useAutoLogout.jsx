import { useEffect, useRef } from "react";

const useAutoLogout = (onLogout, timeoutMs = 5 * 60 * 1000) => {
const timerRef = useRef(null);

const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
    onLogout();
    }, timeoutMs);
};

useEffect(() => {
    const events = [
    "mousemove",
    "mousedown",
    "keypress",
    "scroll",
    "touchstart"
    ];

    events.forEach(event =>
    window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer

    return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    events.forEach(event =>
        window.removeEventListener(event, resetTimer)
    );
    };
}, []);
};

export default useAutoLogout;
