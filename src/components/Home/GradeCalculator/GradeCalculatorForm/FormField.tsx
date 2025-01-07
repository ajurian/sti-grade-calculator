import { Input } from "@/components/ui/input";
import { ChangeEvent, FocusEvent } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
}

export default function FormField({
    id,
    label,
    value,
    onValueChange,
}: FormFieldProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        onValueChange(e.currentTarget.value);

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) =>
        e.currentTarget.select();

    return (
        <div>
            <label className="mb-1 block font-medium" htmlFor={id}>
                {label}
            </label>
            <Input
                type="number"
                id={id}
                value={value}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
        </div>
    );
}
