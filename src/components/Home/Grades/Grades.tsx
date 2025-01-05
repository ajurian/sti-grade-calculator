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
import GradesTable from "./GradesTable";
import ImportButton from "./ImportButton";

export default function Grades() {
    const { grades, deleteIndices } = useGrades();
    const containerRef = useRef<HTMLDivElement>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const tableScrollTop = useScrollTop(tableContainerRef);
    const [isBorderBottomVisible, setIsBorderBottomVisible] = useState(false);

    const [checkedRows, setCheckedRows] = useState<boolean[]>(() =>
        Array(grades.length).fill(false),
    );
    const checkedCount = useMemo(
        () => checkedRows.filter((checked) => checked).length,
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
        const table = tableRef.current;

        if (table === null) {
            return;
        }

        const textareaValue =
            table.querySelectorAll<HTMLDivElement>(".textarea-value");

        if (extension === "docx" || extension === "csv") {
            const clonedGrades = [...grades];

            clonedGrades.forEach(
                (grade, idx) => (grade.subject = textareaValue[idx].innerText),
            );

            const writeFunction =
                extension === "docx" ? writeToDocx : writeToCSV;
            const blob = await writeFunction(clonedGrades);

            downloadBlob(blob, filename);

            return;
        }

        const tableParent = table.parentElement;
        const tableClone = table.cloneNode(true) as HTMLTableElement;

        tableParent?.appendChild(tableClone);

        const thead = tableClone.querySelector("thead");
        const tr = tableClone.querySelectorAll("tr");
        const textarea = tableClone.querySelectorAll("textarea");
        const clonedTextareaValue =
            tableClone.querySelectorAll<HTMLDivElement>(".textarea-value");
        const subjectResizable =
            tableClone.querySelector<HTMLSpanElement>("#subject-resizable");

        if (
            thead === null ||
            tr === null ||
            tr.length === 0 ||
            textarea.length === 0 ||
            subjectResizable === null
        ) {
            return;
        }

        thead.style.boxShadow = "none";
        tr[0].style.borderBottomWidth = "1px";
        tr.forEach((node) => node.removeChild(node.children[0]));
        textarea.forEach((node) => (node.style.display = "none"));
        clonedTextareaValue.forEach((node) => {
            node.style.display = "block";
            node.style.visibility = "visible";
        });

        subjectResizable.classList.remove("after:content-['|']");
        subjectResizable.classList.add("after:content-['']");

        tableClone.style.position = "absolute";
        tableClone.style.left = "101vw";
        tableClone.style.maxHeight = "none";
        tableClone.style.width = "fit-content";

        const canvas = await html2canvas(tableClone, {
            logging: false,
            backgroundColor: "white",
        });

        tableParent?.removeChild(tableClone);

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
            className="min-h-[384px] w-full max-w-[calc(19rem+52ch+7px)] flex-1 p-4 font-mono text-sm"
        >
            <div className="flex flex-wrap items-center gap-4 p-4 font-sans">
                <div className="flex h-10 flex-grow basis-full items-center gap-4">
                    <h2 className="mr-auto text-xl font-medium">Grades</h2>
                    {checkedCount > 0 && (
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete ({checkedCount})
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
                tabIndex={-1}
                className={cn(
                    "relative w-full overflow-auto",
                    isBorderBottomVisible && "border-b",
                )}
            >
                <GradesTable
                    rows={grades}
                    checkedRows={checkedRows}
                    checkedCount={checkedCount}
                    onCheckedChange={setCheckedRows}
                    ref={tableRef}
                />
            </div>
        </div>
    );
}
