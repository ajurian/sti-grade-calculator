import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import downloadBlob from "@/utils/downloadBlob";
import scaleGrade from "@/utils/scaleGrade";
import html2canvas from "html2canvas-pro";
import React, { useRef } from "react";
import { Button } from "../../ui/button";
import { useHistory } from "../HistoryProvider";
import SaveDialogTrigger from "./SaveDialogTrigger";

export default function History() {
    const { history, clearHistory } = useHistory();
    const containerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const handleSave = async (filename: string) => {
        if (tableRef.current === null) {
            return;
        }

        const canvas = await html2canvas(tableRef.current, {
            logging: false,
        });

        canvas.toBlob((blob) => downloadBlob(blob, filename));
    };

    return (
        <div
            ref={containerRef}
            className="box-content min-h-[384px] w-full max-w-[calc(16rem+55ch)] flex-grow p-4 font-mono text-sm xl:border-l"
        >
            <div className="flex items-center gap-4 p-4 font-sans">
                <h2 className="mr-auto text-lg font-medium">History</h2>
                {history.length > 0 && (
                    <Button variant="destructive" onClick={clearHistory}>
                        Clear
                    </Button>
                )}
                <SaveDialogTrigger onSave={handleSave} />
            </div>
            <Table
                ref={tableRef}
                id="history"
                className="w-auto table-fixed bg-white font-mono"
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="box-content min-w-[5ch]" />
                        <TableHead className="box-content min-w-[10ch]">
                            Subject
                        </TableHead>
                        <TableHead>Prelim</TableHead>
                        <TableHead>Midterm</TableHead>
                        <TableHead className="whitespace-nowrap">
                            Pre-final
                        </TableHead>
                        <TableHead className="box-content min-w-[6ch]">
                            Final
                        </TableHead>
                        <TableHead className="box-content min-w-[6ch]">
                            GWA
                        </TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {history.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <TableRow>
                                <TableCell />
                                <TableCell>{item.subject}</TableCell>
                                <TableCell>{item.prelim.toFixed(2)}</TableCell>
                                <TableCell>{item.midterm.toFixed(2)}</TableCell>
                                <TableCell>
                                    {item.prefinal.toFixed(2)}
                                </TableCell>
                                <TableCell>{item.final.toFixed(2)}</TableCell>
                                <TableCell>{item.gwa.toFixed(2)}</TableCell>
                                <TableCell
                                    className={cn(
                                        "whitespace-nowrap font-semibold",
                                        item.status === "Passed"
                                            ? "text-green-500"
                                            : "text-red-500",
                                    )}
                                >
                                    {item.status}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-muted-foreground">
                                    Scale
                                </TableCell>
                                <TableCell />
                                <TableCell>{scaleGrade(item.prelim)}</TableCell>
                                <TableCell>
                                    {scaleGrade(item.midterm)}
                                </TableCell>
                                <TableCell>
                                    {scaleGrade(item.prefinal)}
                                </TableCell>
                                <TableCell>{scaleGrade(item.final)}</TableCell>
                                <TableCell>{scaleGrade(item.gwa)}</TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                    {history.length === 0 && (
                        <TableRow>
                            <TableCell
                                className="h-36 text-center text-slate-400"
                                colSpan={8}
                            >
                                History is empty
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
