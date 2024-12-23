import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RefObject } from "react";
import { useHistory } from "./HistoryProvider";

interface HistoryProps {
    ref?: RefObject<HTMLTableElement | null>;
}

export default function History({ ref }: HistoryProps) {
    const { history } = useHistory();

    return (
        <>
            <Table
                id="history"
                className="w-full bg-white font-[family-name:var(--font-geist-mono)]"
                ref={ref}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="w-0">Prelim</TableHead>
                        <TableHead className="w-0">Midterm</TableHead>
                        <TableHead className="w-0 whitespace-nowrap">
                            Pre-final
                        </TableHead>
                        <TableHead className="w-0">Final</TableHead>
                        <TableHead className="w-0">GWA</TableHead>
                        <TableHead className="w-0">Scale</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {history.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.prelim.toFixed(2)}</TableCell>
                            <TableCell>{item.midterm.toFixed(2)}</TableCell>
                            <TableCell>{item.prefinal.toFixed(2)}</TableCell>
                            <TableCell>{item.final.toFixed(2)}</TableCell>
                            <TableCell>{item.gwa.toFixed(2)}</TableCell>
                            <TableCell>{item.scale}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {history.length === 0 && (
                <div className="flex min-h-[256px] items-center justify-center text-lg text-slate-400">
                    History is empty
                </div>
            )}
        </>
    );
}
