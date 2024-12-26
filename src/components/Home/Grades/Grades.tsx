import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import usePrevious from "@/hooks/usePrevious";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import downloadBlob from "@/utils/downloadBlob";
import writeToCSV from "@/utils/readwrite/writeToCSV";
import writeToDocx from "@/utils/readwrite/writeToDocx";
import html2canvas from "html2canvas-pro";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { useGrades } from "../GradesProvider";
import ExportDialogTrigger from "./ExportDialogTrigger";
import ImportButton from "./ImportButton";

export default function Grades() {
    const { grades, deleteIndices } = useGrades();
    const containerRef = useRef<HTMLDivElement>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const tableScrollTop = useScrollTop(tableContainerRef);
    const [isBorderBottomVisible, setIsBorderBottomVisible] = useState(false);

    const [checkedRows, setCheckedRows] = useState(() =>
        Array(grades.length).fill(false),
    );
    const isAtleastOneChecked = useMemo(
        () => checkedRows.some((checked) => checked),
        [checkedRows],
    );
    const areAllChecked = useMemo(
        () => checkedRows.length > 0 && checkedRows.every((checked) => checked),
        [checkedRows],
    );

    const [justImported, setJustImported] = useState(false);

    const previousGradesLength = usePrevious(grades.length, 0);

    const handleDelete = () => {
        deleteIndices(checkedRows);
        setCheckedRows((checkedRows) =>
            checkedRows.filter((checked) => !checked),
        );
    };

    const handleExport = async (
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

        const tableClone = tableRef.current.cloneNode(true) as HTMLTableElement;

        document.body.appendChild(tableClone);

        const thead = tableClone.querySelector("thead");
        const tr = tableClone.querySelectorAll("tr");

        if (thead === null || tr === null || tr.length === 0) {
            return;
        }

        thead.style.boxShadow = "none";
        tr[0].style.borderBottomWidth = "1px";
        tr.forEach((node) => node.removeChild(node.children[0]));

        tableClone.style.position = "absolute";
        tableClone.style.left = "101vw";
        tableClone.style.maxHeight = "none";
        tableClone.style.width = "fit-content";

        const canvas = await html2canvas(tableClone, {
            logging: false,
            backgroundColor: "white",
        });

        document.body.removeChild(tableClone);

        canvas.toBlob((blob) => downloadBlob(blob, filename));
    };

    useEffect(() => {
        const tableContainer = tableContainerRef.current;
        if (tableContainer === null) {
            return;
        }

        setIsBorderBottomVisible(
            tableContainer.scrollHeight > tableContainer.clientHeight &&
                tableContainer.clientHeight + tableScrollTop <
                    tableContainer.scrollHeight,
        );
    }, [grades.length, tableScrollTop]);

    useLayoutEffect(() => {
        if (justImported) {
            setCheckedRows(Array(grades.length).fill(false));
            setJustImported(false);
            return;
        }

        if (grades.length <= previousGradesLength) {
            return;
        }

        setCheckedRows((checkedRows) => [...checkedRows, false]);
    }, [grades.length, previousGradesLength, justImported]);

    return (
        <div
            ref={containerRef}
            className="min-h-[384px] w-full max-w-[calc(19rem+50ch)] flex-1 p-4 font-mono text-sm"
        >
            <div className="flex flex-wrap items-center gap-4 p-4 font-sans">
                <div className="flex h-10 flex-grow basis-full items-center gap-4">
                    <h2 className="mr-auto text-xl font-medium">Grades</h2>
                    {isAtleastOneChecked && (
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </div>
                <ExportDialogTrigger
                    isDisabled={grades.length === 0}
                    onExport={handleExport}
                />
                <ImportButton onImport={() => setJustImported(true)} />
            </div>

            <div
                ref={tableContainerRef}
                className={cn(
                    "relative w-full overflow-auto",
                    isBorderBottomVisible && "border-b",
                )}
            >
                <Table
                    ref={tableRef}
                    id="grades"
                    className="block max-h-[calc(100vh-10rem-1px)]"
                >
                    <TableHeader className="shadow-b-1px sticky top-0 z-20 bg-background [&_tr]:border-b-0">
                        <TableRow>
                            <TableHead className="shadow-r-1px sticky left-0 w-4 bg-background">
                                <div className="flex w-fit justify-center pr-4">
                                    <Checkbox
                                        disabled={grades.length === 0}
                                        checked={areAllChecked}
                                        onClick={() =>
                                            setCheckedRows(
                                                Array(grades.length).fill(
                                                    !areAllChecked,
                                                ),
                                            )
                                        }
                                    />
                                </div>
                            </TableHead>
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
                                <TableCell className="shadow-r-1px sticky left-0 z-10 bg-background">
                                    <div className="flex w-fit justify-center">
                                        <Checkbox
                                            checked={checkedRows[idx]}
                                            onCheckedChange={() =>
                                                setCheckedRows((checkedRows) =>
                                                    checkedRows.with(
                                                        idx,
                                                        !checkedRows[idx],
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[20ch] break-words">
                                    {item.subject}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.prelim.toFixed(2)}%
                                    <br />({item.prelimScale})
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.midterm.toFixed(2)}%
                                    <br />({item.midtermScale})
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.prefinal.toFixed(2)}%
                                    <br />({item.prefinalScale})
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.final.toFixed(2)}%
                                    <br />({item.finalScale})
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.gwa.toFixed(2)}%
                                    <br />({item.gwaScale})
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
        </div>
    );
}
