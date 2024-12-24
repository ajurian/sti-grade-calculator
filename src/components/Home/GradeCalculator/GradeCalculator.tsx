import GradeField from "@/components/Home/GradeCalculator/GradeField";
import GradingSystem from "@/components/Home/GradeCalculator/GradingSystem";
import Result from "@/components/Home/GradeCalculator/Result";
import { useHistory } from "@/components/Home/HistoryProvider";
import { Button } from "@/components/ui/button";
import computeGWA from "@/utils/computeGWA";
import roundTwo from "@/utils/roundTwo";
import scaleGrade from "@/utils/scaleGrade";
import { useState } from "react";
import AddToHistoryDialogTrigger from "./AddToHistoryDialogTrigger";

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
    const [prelimScale, setPrelimScale] = useState<Scale>("5.00");
    const [midtermScale, setMidtermScale] = useState<Scale>("5.00");
    const [prefinalScale, setPrefinalScale] = useState<Scale>("5.00");
    const [finalScale, setFinalScale] = useState<Scale>("5.00");
    const [gwaScale, setGWAScale] = useState<Scale>("5.00");
    const [status, setStatus] = useState<HistoryItem["status"]>("Failed");

    const { addToHistory } = useHistory();

    const handleCalculate = () => {
        const prelim = roundTwo(Number(prelimInput));
        const midterm = roundTwo(Number(midtermInput));
        const prefinal = roundTwo(Number(prefinalInput));
        const final = roundTwo(Number(finalInput));
        const gwa = computeGWA(
            [prelim, midterm, prefinal, final],
            [0.2, 0.2, 0.2, 0.4],
        );
        const prelimScale = scaleGrade(prelim);
        const midtermScale = scaleGrade(midterm);
        const prefinalScale = scaleGrade(prefinal);
        const finalScale = scaleGrade(final);
        const gwaScale = scaleGrade(gwa);
        const status = gwaScale === "5.00" ? "Failed" : "Passed";

        setPrelim(prelim);
        setMidterm(midterm);
        setPrefinal(prefinal);
        setFinal(final);
        setGWA(gwa);
        setPrelimScale(prelimScale);
        setMidtermScale(midtermScale);
        setPrefinalScale(prefinalScale);
        setFinalScale(finalScale);
        setGWAScale(gwaScale);
        setStatus(status);
        setIsCalculated(true);
    };

    const handleAddToHistory = (subject: string) => {
        if (!isCalculated) {
            return;
        }

        addToHistory({
            subject,
            prelim,
            midterm,
            prefinal,
            final,
            gwa,
            prelimScale,
            midtermScale,
            prefinalScale,
            finalScale,
            gwaScale,
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
        <div className="w-full max-w-[calc(16rem+55ch)] flex-grow border-b p-8 xl:border-r">
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

            <div className="mt-4 flex flex-wrap gap-4">
                <Button
                    className="flex-grow sm:flex-grow-0"
                    onClick={handleCalculate}
                >
                    Calculate
                </Button>
                {isCalculated && (
                    <AddToHistoryDialogTrigger onAdd={handleAddToHistory} />
                )}
                <Button
                    className="basis-full sm:basis-auto"
                    variant="secondary"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
                <GradingSystem />
                {isCalculated && (
                    <Result gwa={gwa} gwaScale={gwaScale} status={status} />
                )}
            </div>
        </div>
    );
}
