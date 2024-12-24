import { cn } from "@/lib/utils";

interface ResultProps {
    gwa: number;
    gwaScale: Scale;
    status: HistoryItem["status"];
}

export default function Result({ gwa, gwaScale, status }: ResultProps) {
    return (
        <div>
            <h2 className="mb-1 text-lg font-semibold">Result</h2>
            <div className="whitespace-pre font-mono text-slate-500">
                <div>
                    GWA:{"    "}
                    <span className="font-semibold text-foreground">
                        {gwa.toFixed(2)}
                    </span>
                </div>
                <div>
                    Scale:{"  "}
                    <span className="font-semibold text-foreground">
                        {gwaScale}
                    </span>
                </div>
                <div>
                    Status:{" "}
                    <span
                        className={cn(
                            "font-bold",
                            status === "Passed"
                                ? "text-green-500"
                                : "text-red-500",
                        )}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
}
