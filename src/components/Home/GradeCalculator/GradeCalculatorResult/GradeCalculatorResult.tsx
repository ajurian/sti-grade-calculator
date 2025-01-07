import { cn } from "@/lib/utils";
import { useGrades } from "../../GradesProvider";
import ResultAddToGradesDialogTrigger from "./ResultAddToGradesDialogTrigger";

interface GradeCalculatorResultProps {
    calculation: Calculation | null;
}

export default function GradeCalculatorResult({
    calculation,
}: GradeCalculatorResultProps) {
    const { addToGrades } = useGrades();

    const handleAddToGrades = (subject: string) => {
        if (calculation === null) return;

        addToGrades({
            subject,
            ...calculation,
        });
    };

    return (
        <div>
            <h2 className="mb-1 text-lg font-semibold">Result</h2>
            <div className="flex gap-[1ch] font-mono text-muted-foreground">
                <div>
                    <div>Prelims:</div>
                    <div>Midterms:</div>
                    <div>Pre-finals:</div>
                    <div>Finals:</div>
                    <div>Final Grade:</div>
                    <div>Status:</div>
                </div>
                {calculation !== null ? (
                    <>
                        <div className="min-w-[7ch] text-right">
                            <div>{calculation.prelims.toFixed(2)}%</div>
                            <div>{calculation.midterms.toFixed(2)}%</div>
                            <div>{calculation.prefinals.toFixed(2)}%</div>
                            <div>{calculation.finals.toFixed(2)}%</div>
                            <div>{calculation.finalGrade.toFixed(2)}%</div>
                            <div
                                className={cn(
                                    "font-semibold",
                                    calculation.status === "Passed"
                                        ? "text-green-500"
                                        : "text-red-500",
                                )}
                            >
                                {calculation.status}
                            </div>
                        </div>
                        <div>
                            <div>({calculation.prelimsScale})</div>
                            <div>({calculation.midtermsScale})</div>
                            <div>({calculation.prefinalsScale})</div>
                            <div>({calculation.finalsScale})</div>
                            <div>({calculation.finalGradeScale})</div>
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
            <ResultAddToGradesDialogTrigger
                isDisabled={calculation === null}
                onAdd={handleAddToGrades}
            />
        </div>
    );
}
