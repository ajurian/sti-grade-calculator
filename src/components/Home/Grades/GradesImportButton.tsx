import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useGrades } from "../GradesProvider";

interface GradesImportButtonProps {
    onImport: (grades: GradeItem[]) => void;
}

export default function GradesImportButton({
    onImport,
}: GradesImportButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { loadFromCSV } = useGrades();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];

        if (!file || (file.type !== "text/csv" && file.type !== "text/txt")) {
            return;
        }

        const fr = new FileReader();

        fr.onload = () => {
            const grades = loadFromCSV(fr.result as string);
            onImport(grades);
        };

        fr.readAsText(file);
    };

    const handleImport = () => inputRef.current?.click();

    return (
        <>
            <input
                ref={inputRef}
                className="invisible hidden"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileChange}
            />
            <Button
                variant="secondary"
                onClick={handleImport}
                className="flex-grow"
            >
                Import
            </Button>
        </>
    );
}
