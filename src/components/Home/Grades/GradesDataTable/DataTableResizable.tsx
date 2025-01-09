import { cn } from "@/lib/utils";
import { RefObject, useEffect, useRef, useState } from "react";

interface DataTableResizableProps {
    tableRef: RefObject<HTMLTableElement | null>;
    text: string;
    className?: string;
}

export default function DataTableResizable({
    text,
    className,
    tableRef,
}: DataTableResizableProps) {
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [pointerOffset, setPointerOffset] = useState(0);
    const textRef = useRef<HTMLSpanElement>(null);
    const resizableRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const textElement = textRef.current;
        const resizableElement = resizableRef.current;
        const tableElement = tableRef.current;

        const onMouseDown = (e: MouseEvent) => {
            if (resizableElement === null || e.target !== resizableElement)
                return;

            setIsPointerDown(true);
            setPointerOffset(
                resizableElement.getBoundingClientRect().left - e.clientX,
            );
        };
        const onMouseUp = () => setIsPointerDown(false);
        const onMouseMove = (e: MouseEvent) => {
            if (
                !isPointerDown ||
                textElement === null ||
                resizableElement === null
            ) {
                return;
            }

            const textElementBounds = textElement.getBoundingClientRect();

            resizableElement.style.marginLeft =
                Math.max(
                    e.clientX - textElementBounds.right + pointerOffset,
                    0,
                ) + "px";

            tableElement
                ?.querySelectorAll("textarea")
                .forEach((node) =>
                    node.dispatchEvent(new Event("input", { bubbles: true })),
                );
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.target !== resizableElement) return;

            if (tableElement) {
                tableElement.style.overflow = "hidden";
            }

            setIsPointerDown(true);
        };

        const onTouchEnd = () => {
            if (tableElement) {
                tableElement.style.overflow = "auto";
            }

            setIsPointerDown(false);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (
                !isPointerDown ||
                textElement === null ||
                resizableElement === null
            ) {
                return;
            }

            e.preventDefault();

            const textElementBounds = textElement.getBoundingClientRect();

            resizableElement.style.marginLeft =
                Math.max(
                    e.targetTouches[0].clientX - textElementBounds.right,
                    0,
                ) + "px";

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
        window.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [isPointerDown, pointerOffset, tableRef]);

    return (
        <>
            <span ref={textRef} className={cn("pr-4", className)}>
                {text}
            </span>
            <span
                ref={resizableRef}
                className={cn(
                    "relative h-12 min-w-[2px] cursor-ew-resize bg-border",
                    isPointerDown && "bg-primary",
                )}
            />
        </>
    );
}
