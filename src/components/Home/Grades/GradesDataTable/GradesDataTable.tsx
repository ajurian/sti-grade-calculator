import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dispatch, RefObject, SetStateAction } from "react";
import DataTableResizable from "./DataTableResizable";
import GradeRow from "./DataTableRow";

interface GradesDataTableProps {
    rows: GradeItem[];
    checkedRows: boolean[];
    checkedCount: number;
    onCheckedChange: Dispatch<SetStateAction<boolean[]>>;
    ref: RefObject<HTMLTableElement | null>;
}

export default function GradesDataTable({
    rows,
    checkedRows,
    checkedCount,
    onCheckedChange,
    ref,
}: GradesDataTableProps) {
    const toggleAllCheckbox = () =>
        onCheckedChange(Array(rows.length).fill(checkedCount !== rows.length));

    const toggleSingleCheckbox = (index: number) =>
        onCheckedChange((checkedRows) =>
            checkedRows.with(index, !checkedRows[index]),
        );

    return (
        <Table
            ref={ref}
            id="grades"
            className="block max-h-[calc(100vh-10rem-1px)]"
        >
            <TableHeader className="sticky top-0 z-20 bg-background">
                <TableRow>
                    <TableHead className="sticky left-0 z-10 w-4 bg-background">
                        <div className="flex w-fit justify-center pr-4">
                            <Checkbox
                                disabled={rows.length === 0}
                                checked={
                                    rows.length > 0 &&
                                    checkedCount === rows.length
                                }
                                onClick={toggleAllCheckbox}
                            />
                        </div>
                    </TableHead>
                    <TableHead className="border-r-0 pr-0">
                        <span className="flex h-full items-center">
                            <DataTableResizable tableRef={ref} text="Subject" />
                        </span>
                    </TableHead>
                    <TableHead className="border-r-0 pr-0 text-center">
                        <span className="flex h-full items-center">
                            <DataTableResizable tableRef={ref} text="Prelims" />
                        </span>
                    </TableHead>
                    <TableHead className="border-r-0 pr-0">
                        <span className="flex h-full items-center">
                            <DataTableResizable
                                tableRef={ref}
                                text="Midterms"
                            />
                        </span>
                    </TableHead>
                    <TableHead className="whitespace-nowrap border-r-0 pr-0">
                        <span className="flex h-full items-center">
                            <DataTableResizable
                                tableRef={ref}
                                text="Pre-finals"
                            />
                        </span>
                    </TableHead>
                    <TableHead className="border-r-0 pr-0 text-center">
                        <span className="flex h-full items-center">
                            <DataTableResizable
                                tableRef={ref}
                                text="Finals"
                                className="box-content min-w-[7ch]"
                            />
                        </span>
                    </TableHead>
                    <TableHead className="border-r-0 pr-0 text-center">
                        <span className="flex h-full items-center">
                            <DataTableResizable
                                tableRef={ref}
                                text="Final Grade"
                                className="box-content min-w-[7ch]"
                            />
                        </span>
                    </TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {rows.map((item, idx) => (
                    <GradeRow
                        key={idx}
                        index={idx}
                        isChecked={checkedRows[idx]}
                        onCheckedChange={() => toggleSingleCheckbox(idx)}
                        {...item}
                    />
                ))}
                {rows.length === 0 && (
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
    );
}
