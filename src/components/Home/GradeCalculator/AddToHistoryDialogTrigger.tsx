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
import { useRef, useState } from "react";

interface AddToHistoryDialogProps {
    onAdd: (subject: string) => void;
}

export default function AddToHistoryDialogTrigger({
    onAdd,
}: AddToHistoryDialogProps) {
    const [subject, setSubject] = useState("");
    const addButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setSubject("")}>
                    Add to History
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add to History</DialogTitle>
                    <CardDescription>Enter subject name</CardDescription>
                </DialogHeader>
                <div className="flex">
                    <Input
                        placeholder="Subject"
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
                            disabled={subject.length === 0}
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
