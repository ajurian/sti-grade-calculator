import { cn } from "@/lib/utils";
import scaleGrade from "@/utils/grade/scaleGrade";
import AddToGradesDialogTrigger from "./AddToGradesDialogTrigger";
import { useGrades } from "../../GradesProvider";

interface ResultProps {
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    status: GradesItem["status"];
    isCalculated: boolean;
}

export default function Result({
    prelim,
    midterm,
    prefinal,
    final,
    gwa,
    status,
    isCalculated,
}: ResultProps) {
    const { addToGrades } = useGrades();

    const handleAddToGrades = (subject: string) => {
        addToGrades({
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
            <div className="flex gap-[1ch] font-mono text-muted-foreground">
                <div>
                    <div>Prelim:</div>
                    <div>Midterm:</div>
                    <div className="whitespace-nowrap">Pre-final:</div>
                    <div>Final:</div>
                    <div>GWA:</div>
                    <div>Status:</div>
                </div>
                {isCalculated ? (
                    <>
                        <div className="min-w-[7ch] text-right">
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
                    </>
                ) : (
                    <div className="mr-[12ch]">
                        <div>--</div>
                        <div>--</div>
                        <div>--</div>
                        <div>--</div>
                        <div>--</div>
                        <div>--</div>
                    </div>
                )}
            </div>
            <AddToGradesDialogTrigger
                isDisabled={!isCalculated}
                onAdd={handleAddToGrades}
            />
        </div>
    );
}
