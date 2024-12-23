import React from "react";

interface ResultProps {
    gwa: number;
    scale: string;
    status: string;
}

export default function Result({ gwa, scale, status }: ResultProps) {
    return (
        <div>
            <h2 className="mb-1 text-lg font-semibold">Result</h2>
            <div className="whitespace-pre font-[family-name:var(--font-geist-mono)] text-slate-500">
                <div>
                    GWA:{"    "}
                    <span className="font-semibold text-foreground">
                        {gwa.toFixed(2)}
                    </span>
                </div>
                <div>
                    Scale:{"  "}
                    <span className="font-semibold text-foreground">
                        {scale}
                    </span>
                </div>
                <div>
                    Status:{" "}
                    <span className="font-bold text-red-500">{status}</span>
                </div>
            </div>
        </div>
    );
}
