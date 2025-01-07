import { RefObject, useEffect, useRef, useState } from "react";

interface DataTableResizableProps {
    tableRef: RefObject<HTMLTableElement | null>;
}

export default function DataTableResizable({
    tableRef,
}: DataTableResizableProps) {
    const [isPointerDown, setIsPointerDown] = useState(false);
    const resizableRef = useRef<HTMLSpanElement>(null);
    const pointerXRef = useRef<number>(0);

    useEffect(() => {
        const element = resizableRef.current;
        const tableElement = tableRef.current;

        const onMouseDown = (e: MouseEvent) => {
            if (e.target !== element) return;
            setIsPointerDown(true);
        };
        const onMouseUp = () => setIsPointerDown(false);
        const onMouseMove = (e: MouseEvent) => {
            if (!isPointerDown || element === null) return;

            element.style.marginLeft =
                Math.max(
                    parseFloat(getComputedStyle(element).marginLeft) +
                        e.movementX,
                    0,
                ) + "px";

            tableElement
                ?.querySelectorAll("textarea")
                .forEach((node) =>
                    node.dispatchEvent(new Event("input", { bubbles: true })),
                );
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.target !== element) return;

            if (tableElement) {
                tableElement.style.overflow = "hidden";
            }

            setIsPointerDown(true);
            pointerXRef.current = e.targetTouches[0].clientX;
        };

        const onTouchEnd = () => {
            if (tableElement) {
                tableElement.style.overflow = "auto";
            }

            setIsPointerDown(false);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!isPointerDown || element === null) return;
            e.preventDefault();

            element.style.marginLeft =
                Math.max(
                    parseFloat(getComputedStyle(element).marginLeft) +
                        e.targetTouches[0].clientX -
                        pointerXRef.current,
                    0,
                ) + "px";

            pointerXRef.current = e.targetTouches[0].clientX;

            tableElement
                ?.querySelectorAll("textarea")
                .forEach((node) =>
                    node.dispatchEvent(new Event("input", { bubbles: true })),
                );
        };

        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);

        return () => {
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [isPointerDown, tableRef]);

    return (
        <span
            ref={resizableRef}
            id="subject-resizable"
            className="relative h-full min-w-4 cursor-ew-resize after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-border after:content-['|']"
        />
    );
}
