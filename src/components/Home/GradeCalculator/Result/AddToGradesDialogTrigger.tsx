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
import { useRef, useState } from "react";
import { useGrades } from "../../GradesProvider";

interface AddToGradesDialogTriggerProps {
    isDisabled: boolean;
    onAdd: (subject: string) => void;
}

export default function AddToGradesDialogTrigger({
    isDisabled,
    onAdd,
}: AddToGradesDialogTriggerProps) {
    const [subject, setSubject] = useState("");
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const { grades } = useGrades();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mt-2 w-full"
                    variant="outline"
                    onClick={() => setSubject("")}
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
                        value={subject}
                        onChange={(e) => setSubject(e.currentTarget.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && addButtonRef.current?.click()
                        }
                    />
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            ref={addButtonRef}
                            onClick={() => onAdd(subject)}
                        >
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
