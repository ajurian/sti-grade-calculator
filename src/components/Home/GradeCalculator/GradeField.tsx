import { Input } from "@/components/ui/input";

interface GradeFieldProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
}

export default function GradeField({
    id,
    label,
    value,
    onValueChange,
}: GradeFieldProps) {
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
            />
        </div>
    );
}
