import { cn } from "@/lib/utils";
import { useGrades } from "../../GradesProvider";
import AddToGradesDialogTrigger from "./AddToGradesDialogTrigger";

interface ResultProps {
    calculation: Omit<GradesItem, "subject"> | null;
}

export default function Result({ calculation }: ResultProps) {
    const { addToGrades } = useGrades();

    const handleAddToGrades = (subject: string) => {
        if (calculation === null) {
            return;
        }

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
                    <div>Prelim:</div>
                    <div>Midterm:</div>
                    <div className="whitespace-nowrap">Pre-final:</div>
                    <div>Final:</div>
                    <div>GWA:</div>
                    <div>Status:</div>
                </div>
                {calculation !== null ? (
                    <>
                        <div className="min-w-[7ch] text-right">
                            <div>{calculation.prelim.toFixed(2)}%</div>
                            <div>{calculation.midterm.toFixed(2)}%</div>
                            <div>{calculation.prefinal.toFixed(2)}%</div>
                            <div>{calculation.final.toFixed(2)}%</div>
                            <div>{calculation.gwa.toFixed(2)}%</div>
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
                            <div>({calculation.prelimScale})</div>
                            <div>({calculation.midtermScale})</div>
                            <div>({calculation.prefinalScale})</div>
                            <div>({calculation.finalScale})</div>
                            <div>({calculation.gwaScale})</div>
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
                isDisabled={calculation === null}
                onAdd={handleAddToGrades}
            />
        </div>
    );
}
