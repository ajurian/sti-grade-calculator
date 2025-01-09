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
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Button } from "../../ui/button";

interface GradesExportDialogTriggerProps {
    isDisabled: boolean;
    onExport: (basename: string, extension: SupportedExportExtension) => void;
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

export default function GradesExportDialogTrigger({
    isDisabled,
    onExport,
}: GradesExportDialogTriggerProps) {
    const [basenameInput, setBasenameInput] = useState("");
    const [defaultBasename, setDefaultBasename] = useState("");
    const [extension, setExtension] = useState("png");
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    const handleExport = () => setDefaultBasename(generateBasename());

    const handleBasenameInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setBasenameInput(e.currentTarget.value);

    const handleBasenameInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        saveButtonRef.current?.click();
    };

    const handleSave = () =>
        onExport(
            basenameInput || defaultBasename,
            extension as SupportedExportExtension,
        );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={isDisabled}
                    onClick={handleExport}
                    className="flex-grow basis-0"
                >
                    Export
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Export</DialogTitle>
                    <DialogDescription>
                        Export the table as .{extension} file
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-1">
                    <Input
                        placeholder={defaultBasename}
                        value={basenameInput}
                        onChange={handleBasenameInputChange}
                        onKeyDown={handleBasenameInputKeyDown}
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
                        <Button ref={saveButtonRef} onClick={handleSave}>
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
