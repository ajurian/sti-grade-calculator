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
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
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
            className="box-border min-h-[384px] w-full max-w-[calc(16rem+55ch)] flex-grow overflow-hidden p-4 font-mono text-sm"
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
                        <TableHead>Scale</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {history.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="whitespace-nowrap">
                                {item.subject}
                            </TableCell>
                            <TableCell>{item.prelim.toFixed(2)}</TableCell>
                            <TableCell>{item.midterm.toFixed(2)}</TableCell>
                            <TableCell>{item.prefinal.toFixed(2)}</TableCell>
                            <TableCell>{item.final.toFixed(2)}</TableCell>
                            <TableCell>{item.gwa.toFixed(2)}</TableCell>
                            <TableCell>{item.scale}</TableCell>
                            <TableCell
                                className={cn(
                                    "whitespace-nowrap font-semibold",
                                    item.scale === "5.00"
                                        ? "text-red-500"
                                        : "text-green-500",
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
