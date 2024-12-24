import GradeField from "@/components/Home/GradeCalculator/GradeField";
import GradingSystem from "@/components/Home/GradeCalculator/GradingSystem";
import { Button } from "@/components/ui/button";
import computeGWA from "@/utils/computeGWA";
import roundTwo from "@/utils/roundTwo";
import scaleGrade from "@/utils/scaleGrade";
import { useState } from "react";
import Result from "./Result";

export default function GradeCalculator() {
    const [prelimInput, setPrelimInput] = useState("");
    const [midtermInput, setMidtermInput] = useState("");
    const [prefinalInput, setPrefinalInput] = useState("");
    const [finalInput, setFinalInput] = useState("");
    const [isCalculated, setIsCalculated] = useState(false);

    const [prelim, setPrelim] = useState(0);
    const [midterm, setMidterm] = useState(0);
    const [prefinal, setPrefinal] = useState(0);
    const [final, setFinal] = useState(0);
    const [gwa, setGWA] = useState(0);
    const [status, setStatus] = useState<HistoryItem["status"]>("Failed");

    const handleCalculate = () => {
        const prelim = roundTwo(Number(prelimInput));
        const midterm = roundTwo(Number(midtermInput));
        const prefinal = roundTwo(Number(prefinalInput));
        const final = roundTwo(Number(finalInput));
        const gwa = computeGWA(
            [prelim, midterm, prefinal, final],
            [0.2, 0.2, 0.2, 0.4],
        );
        const gwaScale = scaleGrade(gwa);
        const status = gwaScale === "5.00" ? "Failed" : "Passed";

        setPrelim(prelim);
        setMidterm(midterm);
        setPrefinal(prefinal);
        setFinal(final);
        setGWA(gwa);
        setStatus(status);
        setIsCalculated(true);
    };

    const handleReset = () => {
        setPrelimInput("");
        setMidtermInput("");
        setPrefinalInput("");
        setFinalInput("");
        setIsCalculated(false);
    };

    return (
        <div className="w-full max-w-[calc(14rem+50ch)] flex-grow border-b p-8 xl:sticky xl:top-0 xl:h-screen xl:border-b-0 xl:border-r">
            <h1 className="mb-2 text-xl font-semibold">Grade Calculator</h1>
            <div className="mb-8 text-slate-500">Enter your grades</div>

            <div className="xs:grid-cols-2 xs:grid-rows-2 grid gap-4">
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

            <div className="mt-4 flex flex-wrap gap-4">
                <Button
                    className="xs:basis-0 flex-1 basis-full sm:flex-grow-0"
                    onClick={handleCalculate}
                >
                    Calculate
                </Button>
                <Button
                    className="xs:basis-0 flex-1 basis-full sm:flex-grow-0"
                    variant="secondary"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
                <GradingSystem />
                {isCalculated && (
                    <Result
                        prelim={prelim}
                        midterm={midterm}
                        prefinal={prefinal}
                        final={final}
                        gwa={gwa}
                        status={status}
                    />
                )}
            </div>
        </div>
    );
}
