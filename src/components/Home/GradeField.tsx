import React from "react";
import { Input } from "../ui/input";

interface GradeInputProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
}

export default function GradeInput({
    id,
    label,
    value,
    onValueChange,
}: GradeInputProps) {
    return (
        <div>
            <label className="mb-1 block font-medium" htmlFor={id}>
                {label}
            </label>
            <Input
                type="number"
                id={id}
                value={value}
                onChange={(e) => onValueChange(e.currentTarget.value)}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) =>
                    !e.altKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    e.key.length == 1 &&
                    !/^\d+$/g.test(e.key) &&
                    e.preventDefault()
                }
            />
        </div>
    );
}
