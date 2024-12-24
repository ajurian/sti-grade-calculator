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
import saveToDocx from "@/utils/saveToDocx";
import scaleGrade from "@/utils/scaleGrade";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
import { Button } from "../../ui/button";
import { useHistory } from "../HistoryProvider";
import SaveDialogTrigger from "./SaveDialogTrigger";
import saveToCSV from "@/utils/saveToCSV";

export type SupportedExtension = "png" | "csv" | "docx";

export default function History() {
    const { history, clearHistory } = useHistory();
    const containerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const handleSave = async (
        basename: string,
        extension: SupportedExtension,
    ) => {
        const filename = basename + "." + extension;

        if (extension === "docx") {
            const blob = await saveToDocx(history);
            downloadBlob(blob, filename);
            return;
        }

        if (extension === "csv") {
            const blob = saveToCSV(history);
            downloadBlob(blob, filename);
            return;
        }

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
            className="min-h-[384px] w-full max-w-[calc(16rem+50ch)] flex-grow p-4 font-mono text-sm"
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
                className="w-auto bg-white font-mono"
            >
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="box-content min-w-[7ch] text-center">
                            Prelim
                        </TableHead>
                        <TableHead>Midterm</TableHead>
                        <TableHead className="whitespace-nowrap">
                            Pre-final
                        </TableHead>
                        <TableHead className="box-content min-w-[7ch] text-center">
                            Final
                        </TableHead>
                        <TableHead className="box-content min-w-[7ch] text-center">
                            GWA
                        </TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {history.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="max-w-[20ch] break-words">
                                {item.subject}
                            </TableCell>
                            <TableCell className="text-right">
                                {item.prelim.toFixed(2)}%
                                <br />({scaleGrade(item.prelim)})
                            </TableCell>
                            <TableCell className="text-right">
                                {item.midterm.toFixed(2)}%
                                <br />({scaleGrade(item.midterm)})
                            </TableCell>
                            <TableCell className="text-right">
                                {item.prefinal.toFixed(2)}%
                                <br />({scaleGrade(item.prefinal)})
                            </TableCell>
                            <TableCell className="text-right">
                                {item.final.toFixed(2)}%
                                <br />({scaleGrade(item.final)})
                            </TableCell>
                            <TableCell className="text-right">
                                {item.gwa.toFixed(2)}%
                                <br />({scaleGrade(item.gwa)})
                            </TableCell>
                            <TableCell
                                className={cn(
                                    "whitespace-nowrap text-center font-semibold",
                                    item.status === "Passed"
                                        ? "text-green-500"
                                        : "text-red-500",
                                )}
                            >
                                {item.status}
                            </TableCell>
                        </TableRow>
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
