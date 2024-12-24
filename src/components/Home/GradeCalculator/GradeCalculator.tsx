import GradeField from "@/components/Home/GradeCalculator/GradeField";
import GradingSystem from "@/components/Home/GradeCalculator/GradingSystem";
import Result from "@/components/Home/GradeCalculator/Result";
import { useHistory } from "@/components/Home/HistoryProvider";
import { Button } from "@/components/ui/button";
import computeGWA from "@/utils/computeGWA";
import scaleGWA from "@/utils/scaleGWA";
import { useState } from "react";
import AddToHistoryDialogTrigger from "./AddToHistoryDialogTrigger";

export default function GradeCalculator() {
    const [prelimInput, setPrelimInput] = useState("");
    const [midtermInput, setMidtermInput] = useState("");
    const [prefinalInput, setPrefinalInput] = useState("");
    const [finalInput, setFinalInput] = useState("");
    const [isCalculated, setIsCalculated] = useState(false);

    const [gwa, setGWA] = useState(0);
    const [scale, setScale] = useState<HistoryItem["scale"]>("5.00");
    const [status, setStatus] = useState<HistoryItem["status"]>("Failed");

    const { addToHistory } = useHistory();

    const handleCalculate = () => {
        const prelim = Number(prelimInput);
        const midterm = Number(midtermInput);
        const prefinal = Number(prefinalInput);
        const final = Number(finalInput);
        const gwa = computeGWA(
            [prelim, midterm, prefinal, final],
            [0.2, 0.2, 0.2, 0.4],
        );
        const scale = scaleGWA(gwa);
        const status = scale === "5.00" ? "Failed" : "Passed";

        setGWA(gwa);
        setScale(scale);
        setStatus(status);
        setIsCalculated(true);
    };

    const handleAddToHistory = (subject: string) => {
        if (!isCalculated) {
            return;
        }

        const prelim = Number(prelimInput);
        const midterm = Number(midtermInput);
        const prefinal = Number(prefinalInput);
        const final = Number(finalInput);

        addToHistory({
            subject,
            prelim,
            midterm,
            prefinal,
            final,
            gwa,
            scale,
            status,
        });
    };

    const handleReset = () => {
        setPrelimInput("");
        setMidtermInput("");
        setPrefinalInput("");
        setFinalInput("");
        setIsCalculated(false);
    };

    return (
        <div className="box-content max-w-[calc(16rem+55ch)] flex-grow border-b p-8 xl:border-r">
            <h1 className="mb-2 text-xl font-semibold">Grade Calculator</h1>
            <div className="mb-8 text-slate-500">Enter your grades</div>

            <div className="grid grid-cols-2 grid-rows-2 gap-4">
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

            <div className="mt-4 flex gap-4">
                <Button onClick={handleCalculate}>Calculate</Button>
                {isCalculated && (
                    <AddToHistoryDialogTrigger onAdd={handleAddToHistory} />
                )}
                <Button
                    className="ml-auto"
                    variant="secondary"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
                <GradingSystem />
                {isCalculated && (
                    <Result gwa={gwa} scale={scale} status={status} />
                )}
            </div>
        </div>
    );
}
