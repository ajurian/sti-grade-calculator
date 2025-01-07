import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import getDefaultSubjectName from "@/utils/getDefaultSubjectName";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useGrades } from "../../GradesProvider";

interface ResultAddToGradesDialogTriggerProps {
    isDisabled: boolean;
    onAdd: (subject: string) => void;
}

export default function ResultAddToGradesDialogTrigger({
    isDisabled,
    onAdd,
}: ResultAddToGradesDialogTriggerProps) {
    const [subjectInput, setSubjectInput] = useState("");
    const addButtonRef = useRef<HTMLButtonElement>(null);

    const { grades } = useGrades();

    const handleAddToGrades = () => setSubjectInput("");

    const handleSubjectInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSubjectInput(e.currentTarget.value);

    const handleSubjectInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        addButtonRef.current?.click();
    };

    const handleAdd = () => onAdd(subjectInput);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mt-2 w-full"
                    variant="outline"
                    onClick={handleAddToGrades}
                    disabled={isDisabled}
                >
                    Add to Grades
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add to Grades</DialogTitle>
                    <CardDescription>Enter subject name</CardDescription>
                </DialogHeader>
                <div className="flex">
                    <Input
                        placeholder={getDefaultSubjectName(grades.length)}
                        value={subjectInput}
                        onChange={handleSubjectInputChange}
                        onKeyDown={handleSubjectInputKeyDown}
                    />
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button ref={addButtonRef} onClick={handleAdd}>
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
