import { useState, useEffect, RefObject } from "react";

export function useScrollTop(ref: RefObject<HTMLElement | null>) {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (element === null) {
            return;
        }

        const handleScroll = () => setScrollTop(element.scrollTop);

        element.addEventListener("scroll", handleScroll);
        setScrollTop(element.scrollTop);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [ref]);

    return scrollTop;
}
