import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";

interface GradeRowProps extends GradesItem {
    isChecked: boolean;
    onCheckedChange: () => void;
}

export default function GradeRow(props: GradeRowProps) {
    const [subject, setSubject] = useState(props.subject);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaValueRef = useRef<HTMLDivElement>(null);

    const handleSubjectChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSubject(e.currentTarget.value);

        if (textareaValueRef.current) {
            textareaValueRef.current.innerText = e.currentTarget.value;
        }
    };

    const handleSubjectInput = () => {
        const element = textareaRef.current;
        if (element === null) {
            return;
        }

        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };

    return (
        <TableRow>
            <TableCell className="sticky left-0 z-10 bg-background">
                <div className="flex w-fit justify-center">
                    <Checkbox
                        checked={props.isChecked}
                        onCheckedChange={props.onCheckedChange}
                    />
                </div>
            </TableCell>
            <TableCell className="max-w-[7ch] break-words">
                <textarea
                    ref={textareaRef}
                    placeholder="-------"
                    rows={1}
                    value={subject}
                    onChange={handleSubjectChange}
                    onInput={handleSubjectInput}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    className="w-full resize-none overflow-hidden bg-transparent focus:outline-none"
                />
                <div
                    ref={textareaValueRef}
                    className="textarea-value invisible hidden"
                >
                    {props.subject}
                </div>
            </TableCell>
            <TableCell className="text-right">
                {props.prelims.toFixed(2)}%
                <br />({props.prelimsScale})
            </TableCell>
            <TableCell className="text-right">
                {props.midterms.toFixed(2)}%
                <br />({props.midtermsScale})
            </TableCell>
            <TableCell className="text-right">
                {props.prefinals.toFixed(2)}%
                <br />({props.prefinalsScale})
            </TableCell>
            <TableCell className="text-right">
                {props.finals.toFixed(2)}%
                <br />({props.finalsScale})
            </TableCell>
            <TableCell className="text-right">
                {props.finalGrade.toFixed(2)}%
                <br />({props.finalGradeScale})
            </TableCell>
            <TableCell
                className={cn(
                    "whitespace-nowrap text-center font-semibold",
                    props.status === "Passed"
                        ? "text-green-500"
                        : "text-red-500",
                )}
            >
                {props.status}
            </TableCell>
        </TableRow>
    );
}
