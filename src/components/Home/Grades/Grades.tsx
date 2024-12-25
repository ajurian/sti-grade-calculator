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
import scaleGrade from "@/utils/grade/scaleGrade";
import writeToCSV from "@/utils/readwrite/writeToCSV";
import writeToDocx from "@/utils/readwrite/writeToDocx";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
import { Button } from "../../ui/button";
import { useGrades } from "../GradesProvider";
import ExportDialogTrigger from "./ExportDialogTrigger";
import ImportButton from "./ImportButton";

export default function Grades() {
    const { grades, clearGrades } = useGrades();
    const containerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const handleSave = async (
        basename: string,
        extension: SupportedExportExtension,
    ) => {
        const filename = basename + "." + extension;

        if (extension === "docx") {
            const blob = await writeToDocx(grades);
            downloadBlob(blob, filename);
            return;
        }

        if (extension === "csv") {
            const blob = writeToCSV(grades);
            downloadBlob(blob, filename);
            return;
        }

        if (tableRef.current === null) {
            return;
        }

        const canvas = await html2canvas(tableRef.current, {
            logging: false,
            backgroundColor: "white",
        });

        canvas.toBlob((blob) => downloadBlob(blob, filename));
    };

    return (
        <div
            ref={containerRef}
            className="min-h-[384px] w-full max-w-[calc(16rem+50ch)] flex-1 p-4 font-mono text-sm"
        >
            <div className="flex items-center gap-4 p-4 font-sans">
                <h2 className="mr-auto text-lg font-medium">Grades</h2>
                {grades.length > 0 && (
                    <Button variant="destructive" onClick={clearGrades}>
                        Clear
                    </Button>
                )}
                <ExportDialogTrigger onSave={handleSave} />
                <ImportButton />
            </div>
            <Table ref={tableRef} id="grades" className="w-auto font-mono">
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
                    {grades.map((item, idx) => (
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
                    {grades.length === 0 && (
                        <TableRow>
                            <TableCell
                                className="h-36 text-center text-slate-400"
                                colSpan={8}
                            >
                                Grades is empty
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
