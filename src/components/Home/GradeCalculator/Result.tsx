import { cn } from "@/lib/utils";
import scaleGrade from "@/utils/scaleGrade";
import AddToHistoryDialogTrigger from "./AddToHistoryDialogTrigger";
import { useHistory } from "../HistoryProvider";

interface ResultProps {
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    status: HistoryItem["status"];
}

export default function Result({
    prelim,
    midterm,
    prefinal,
    final,
    gwa,
    status,
}: ResultProps) {
    const { addToHistory } = useHistory();

    const handleAddToHistory = (subject: string) => {
        addToHistory({
            subject,
            prelim,
            midterm,
            prefinal,
            final,
            gwa,
            status,
        });
    };

    return (
        <div>
            <h2 className="mb-1 text-lg font-semibold">Result</h2>
            <div className="flex gap-[1ch] font-mono text-sm text-slate-500">
                <div>
                    <div>Prelim:</div>
                    <div>Midterm:</div>
                    <div>Pre-final:</div>
                    <div>Final:</div>
                    <div>GWA:</div>
                    <div>Status:</div>
                </div>
                <div className="text-right">
                    <div>{prelim.toFixed(2)}%</div>
                    <div>{midterm.toFixed(2)}%</div>
                    <div>{prefinal.toFixed(2)}%</div>
                    <div>{final.toFixed(2)}%</div>
                    <div>{gwa.toFixed(2)}%</div>
                    <div
                        className={cn(
                            "font-semibold",
                            status === "Passed"
                                ? "text-green-500"
                                : "text-red-500",
                        )}
                    >
                        {status}
                    </div>
                </div>
                <div>
                    <div>({scaleGrade(prelim)})</div>
                    <div>({scaleGrade(midterm)})</div>
                    <div>({scaleGrade(prefinal)})</div>
                    <div>({scaleGrade(final)})</div>
                    <div>({scaleGrade(gwa)})</div>
                </div>
            </div>
            <AddToHistoryDialogTrigger onAdd={handleAddToHistory} />
        </div>
    );
}
