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
import GradeRow from "./GradeRow";
import Resizable from "./Resizable";

interface GradesTableProps {
    rows: GradesItem[];
    checkedRows: boolean[];
    checkedCount: number;
    onCheckedChange: Dispatch<SetStateAction<boolean[]>>;
    ref: RefObject<HTMLTableElement | null>;
}

export default function GradesTable({
    rows,
    checkedRows,
    checkedCount,
    onCheckedChange,
    ref,
}: GradesTableProps) {
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
                                onClick={() =>
                                    onCheckedChange(
                                        Array(rows.length).fill(
                                            checkedCount !== rows.length,
                                        ),
                                    )
                                }
                            />
                        </div>
                    </TableHead>
                    <TableHead className="pr-0">
                        <span className="flex h-full items-center">
                            Subject
                            <Resizable tableRef={ref} />
                        </span>
                    </TableHead>
                    <TableHead className="box-content min-w-[7ch] text-center">
                        Prelims
                    </TableHead>
                    <TableHead>Midterms</TableHead>
                    <TableHead className="whitespace-nowrap">
                        Pre-finals
                    </TableHead>
                    <TableHead className="box-content min-w-[7ch] text-center">
                        Finals
                    </TableHead>
                    <TableHead className="box-content min-w-[7ch] text-center">
                        Final Grade
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
                        onCheckedChange={() =>
                            onCheckedChange((checkedRows) =>
                                checkedRows.with(idx, !checkedRows[idx]),
                            )
                        }
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
