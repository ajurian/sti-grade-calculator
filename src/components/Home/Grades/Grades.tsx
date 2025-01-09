import usePrevious from "@/hooks/usePrevious";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import downloadBlob from "@/utils/downloadBlob";
import writeToCSV from "@/utils/readwrite/writeToCSV";
import writeToDocx from "@/utils/readwrite/writeToDocx";
import writeToPNG from "@/utils/readwrite/writeToPNG";
import _ from "lodash";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { useGrades } from "../GradesProvider";
import GradesTable from "./GradesDataTable";
import GradesExportDialogTrigger from "./GradesExportDialogTrigger";
import GradesImportButton from "./GradesImportButton";

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

    const [hasJustImported, setHasJustImported] = useState(false);

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
        if (table === null) return;

        const textareaValue =
            table.querySelectorAll<HTMLDivElement>(".textarea-value");

        let blob = null;

        if (extension === "docx" || extension === "csv") {
            const clonedGrades = _.cloneDeep(grades);

            clonedGrades.forEach(
                (grade, idx) => (grade.subject = textareaValue[idx].innerText),
            );

            if (extension === "docx") blob = await writeToDocx(clonedGrades);
            if (extension === "csv") blob = writeToCSV(clonedGrades);
        } else {
            blob = await writeToPNG(table);
        }

        downloadBlob(blob, filename);
    };

    const handleImport = () => setHasJustImported(true);

    useEffect(() => {
        const tableContainer = tableContainerRef.current;
        if (tableContainer === null) return;

        setIsBorderBottomVisible(
            tableContainer.scrollHeight > tableContainer.clientHeight &&
                tableContainer.clientHeight + tableScrollTop <
                    tableContainer.scrollHeight,
        );
    }, [grades.length, tableScrollTop]);

    useLayoutEffect(() => {
        if (hasJustImported) {
            setCheckedRows(Array(grades.length).fill(false));
            setHasJustImported(false);
            return;
        }

        if (grades.length <= previousGradesLength) return;

        setCheckedRows((checkedRows) => [...checkedRows, false]);
    }, [grades.length, previousGradesLength, hasJustImported]);

    return (
        <div
            ref={containerRef}
            className="min-h-[384px] w-full max-w-[calc(19rem+52ch+14px)] flex-1 p-4 font-mono text-sm"
        >
            <div className="flex flex-wrap items-center gap-4 p-4 font-sans">
                <div className="flex h-10 flex-grow basis-full items-center gap-4">
                    <h2 className="mr-auto text-xl font-medium">Grades</h2>

                    {checkedCount > 0 && (
                        <Button
                            className="self-end"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete ({checkedCount})
                        </Button>
                    )}
                </div>

                <GradesExportDialogTrigger
                    isDisabled={grades.length === 0}
                    onExport={handleExport}
                />
                <GradesImportButton onImport={handleImport} />
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
