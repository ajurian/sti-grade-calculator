import GradeField from "@/components/Home/GradeCalculator/GradeField";
import GradingSystem from "@/components/Home/GradeCalculator/GradingSystem";
import { Button } from "@/components/ui/button";
import calculateGrades from "@/utils/grade/calculateGrades";
import { useState } from "react";
import Result from "./Result";

export default function GradeCalculator() {
    const [prelimInput, setPrelimInput] = useState("");
    const [midtermInput, setMidtermInput] = useState("");
    const [prefinalInput, setPrefinalInput] = useState("");
    const [finalInput, setFinalInput] = useState("");

    const [calculation, setCalculation] = useState<Omit<
        GradesItem,
        "subject"
    > | null>(null);

    const handleCalculate = () => {
        const calculation = calculateGrades({
            prelimRaw: prelimInput,
            midtermRaw: midtermInput,
            prefinalRaw: prefinalInput,
            finalRaw: finalInput,
        });

        setCalculation(calculation);
    };

    const handleReset = () => {
        setPrelimInput("");
        setMidtermInput("");
        setPrefinalInput("");
        setFinalInput("");
        setCalculation(null);
    };

    return (
        <div className="w-full max-w-[calc(14rem+50ch)] flex-1 border-b p-8 xl:h-screen xl:border-b-0 xl:border-r">
            <h1 className="mb-2 text-xl font-semibold">Grade Calculator</h1>
            <div className="mb-8 text-muted-foreground">Enter your grades</div>

            <div className="grid gap-4 xs:grid-cols-2 xs:grid-rows-2">
                <GradeField
                    id="prelim"
                    label="Prelim Grade"
                    value={prelimInput}
                    onValueChange={setPrelimInput}
                />
                <GradeField
                    id="midterm"
                    label="Midterm Grade"
                    value={midtermInput}
                    onValueChange={setMidtermInput}
                />
                <GradeField
                    id="pre-final"
                    label="Pre-final Grade"
                    value={prefinalInput}
                    onValueChange={setPrefinalInput}
                />
                <GradeField
                    id="final"
                    label="Final Grade"
                    value={finalInput}
                    onValueChange={setFinalInput}
                />
            </div>

            <div className="w-full font-mono sm:w-[25ch]">
                <div className="mt-4 flex flex-wrap gap-4 font-sans">
                    <Button
                        className="flex-1 basis-full xs:basis-0"
                        onClick={handleCalculate}
                    >
                        Calculate
                    </Button>
                    <Button
                        className="flex-1 basis-full xs:basis-0"
                        variant="secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
                <Result calculation={calculation} />
                <GradingSystem />
            </div>
        </div>
    );
}
