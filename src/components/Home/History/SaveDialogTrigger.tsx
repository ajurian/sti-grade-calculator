import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "../../ui/button";

interface SaveDialogProps {
    onSave: (filename: string) => void;
}

function generateBasename() {
    const now = new Date();

    return (
        "grade_table_" +
        now.toLocaleDateString("en-US").replaceAll("/", "_") +
        "_" +
        now.toLocaleTimeString("en-US").replaceAll(/[: ]/g, "_")
    );
}

export default function SaveDialogTrigger({ onSave }: SaveDialogProps) {
    const [basename, setBasename] = useState("");
    const [defaultBasename, setDefaultBasename] = useState("");
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => setDefaultBasename(generateBasename())}>
                    Download
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Download</DialogTitle>
                    <DialogDescription>
                        Save the table as .png file
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-1">
                    <Input
                        placeholder={defaultBasename}
                        value={basename}
                        onChange={(e) => setBasename(e.currentTarget.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && saveButtonRef.current?.click()
                        }
                    />
                    <div className="text-slate-700">.png</div>
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            ref={saveButtonRef}
                            onClick={() =>
                                onSave((basename || defaultBasename) + ".png")
                            }
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
