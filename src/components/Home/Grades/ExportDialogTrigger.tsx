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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { Button } from "../../ui/button";

interface ExportDialogTriggerProps {
    onSave: (basename: string, extension: SupportedExportExtension) => void;
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

export default function ExportDialogTrigger({
    onSave,
}: ExportDialogTriggerProps) {
    const [basename, setBasename] = useState("");
    const [defaultBasename, setDefaultBasename] = useState("");
    const [extension, setExtension] = useState("png");
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => setDefaultBasename(generateBasename())}>
                    Export
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Export</DialogTitle>
                    <DialogDescription>
                        Save the table as .{extension} file
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
                    <Select value={extension} onValueChange={setExtension}>
                        <SelectTrigger className="w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">.png</SelectItem>
                            <SelectItem value="csv">.csv</SelectItem>
                            <SelectItem value="docx">.docx</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            ref={saveButtonRef}
                            onClick={() =>
                                onSave(
                                    basename || defaultBasename,
                                    extension as SupportedExportExtension,
                                )
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
