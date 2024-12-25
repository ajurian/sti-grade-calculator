import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useGrades } from "../GradesProvider";

export default function ImportButton() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { loadFromCSV } = useGrades();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];

        if (!file || (file.type !== "text/csv" && file.type !== "text/txt")) {
            return;
        }

        const fr = new FileReader();

        fr.onload = () => loadFromCSV(fr.result as string);
        fr.readAsText(file);
    };

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
                onClick={() => inputRef.current?.click()}
            >
                Import
            </Button>
        </>
    );
}
