import FormField from "@/components/Home/GradeCalculator/GradeCalculatorForm/FormField";
import { Button } from "@/components/ui/button";
import calculateGrades from "@/utils/grade/calculateGrades";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface GradeCalculatorFormProps {
    onCalculationChange: Dispatch<SetStateAction<Calculation | null>>;
}

export default function GradeCalculatorForm({
    onCalculationChange,
}: GradeCalculatorFormProps) {
    const [prelimInput, setPrelimInput] = useState("");
    const [midtermInput, setMidtermInput] = useState("");
    const [prefinalInput, setPrefinalInput] = useState("");
    const [finalInput, setFinalInput] = useState("");

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const calculation = calculateGrades({
            prelimsRaw: prelimInput,
            midtermsRaw: midtermInput,
            prefinalsRaw: prefinalInput,
            finalsRaw: finalInput,
        });

        onCalculationChange(calculation);
    };

    const handleReset = () => {
        setPrelimInput("");
        setMidtermInput("");
        setPrefinalInput("");
        setFinalInput("");
        onCalculationChange(null);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 xs:grid-cols-2 xs:grid-rows-2">
                <FormField
                    id="prelim"
                    label="Prelims"
                    value={prelimInput}
                    onValueChange={setPrelimInput}
                />
                <FormField
                    id="midterm"
                    label="Midterms"
                    value={midtermInput}
                    onValueChange={setMidtermInput}
                />
                <FormField
                    id="pre-final"
                    label="Pre-finals"
                    value={prefinalInput}
                    onValueChange={setPrefinalInput}
                />
                <FormField
                    id="final"
                    label="Finals"
                    value={finalInput}
                    onValueChange={setFinalInput}
                />
            </div>

            <div className="mt-4 w-full font-mono sm:w-[27ch]">
                <div className="flex flex-wrap gap-4 font-sans">
                    <Button
                        type="submit"
                        className="flex-1 basis-full xs:basis-0"
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
        </form>
    );
}
