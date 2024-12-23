"use client";

import GradeInput from "@/components/Home/GradeField";
import GradingSystem from "@/components/Home/GradingSystem";
import History from "@/components/Home/History";
import { useHistory } from "@/components/Home/HistoryProvider";
import Result from "@/components/Home/Result";
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
import computeGWA from "@/utils/computeGWA";
import describeGWA from "@/utils/describeGWA";
import downloadBlob from "@/utils/downloadBlob";
import scaleGWA from "@/utils/scaleGWA";
import html2canvas from "html2canvas-pro";
import { useRef, useState } from "react";

export default function Home() {
    const historyRef = useRef<HTMLTableElement>(null);

    const [prelimInput, setPrelimInput] = useState("");
    const [midtermInput, setMidtermInput] = useState("");
    const [prefinalInput, setPrefinalInput] = useState("");
    const [finalInput, setFinalInput] = useState("");
    const [isCalculated, setIsCalculated] = useState(false);

    const [gwa, setGWA] = useState(0);
    const [scale, setScale] = useState("0.00");
    const [status, setStatus] = useState("");

    const [subject, setSubject] = useState("");

    const { history, addToHistory, clearHistory } = useHistory();

    const handleCalculate = () => {
        const prelim = Number(prelimInput);
        const midterm = Number(midtermInput);
        const prefinal = Number(prefinalInput);
        const final = Number(finalInput);
        const gwa = computeGWA(
            [prelim, midterm, prefinal, final],
            [0.2, 0.2, 0.2, 0.4],
        );
        const scale = scaleGWA(gwa);
        const status = describeGWA(gwa);

        setGWA(gwa);
        setScale(scale);
        setStatus(status);
        setIsCalculated(true);
    };

    const handleAddToHistory = () => {
        if (!isCalculated) {
            return;
        }

        const prelim = Number(prelimInput);
        const midterm = Number(midtermInput);
        const prefinal = Number(prefinalInput);
        const final = Number(finalInput);

        addToHistory({
            subject,
            prelim,
            midterm,
            prefinal,
            final,
            gwa,
            scale,
            status,
        });
    };

    const handleSave = async () => {
        if (historyRef.current === null) {
            return;
        }

        const canvas = await html2canvas(historyRef.current, {
            logging: false,
        });

        canvas.toBlob(downloadBlob);
    };

    const handleReset = () => {
        setPrelimInput("");
        setMidtermInput("");
        setPrefinalInput("");
        setFinalInput("");
        setIsCalculated(false);
    };

    return (
        <div className="flex min-h-screen flex-wrap justify-center font-[family-name:var(--font-geist-sans)] xl:flex-nowrap">
            <div className="w-full max-w-3xl border-b p-8 xl:border-r">
                <h1 className="mb-2 text-xl font-semibold">Grade Calculator</h1>
                <div className="mb-8 text-slate-500">Enter your grades</div>

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <GradeInput
                        id="prelim"
                        label="Prelim Grade"
                        value={prelimInput}
                        onValueChange={setPrelimInput}
                    />
                    <GradeInput
                        id="midterm"
                        label="Midterm Grade"
                        value={midtermInput}
                        onValueChange={setMidtermInput}
                    />
                    <GradeInput
                        id="pre-final"
                        label="Pre-final Grade"
                        value={prefinalInput}
                        onValueChange={setPrefinalInput}
                    />
                    <GradeInput
                        id="final"
                        label="Final Grade"
                        value={finalInput}
                        onValueChange={setFinalInput}
                    />
                </div>

                <div className="mt-4 flex gap-4">
                    <Button onClick={handleCalculate}>Calculate</Button>
                    {isCalculated && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => setSubject("")}
                                >
                                    Add to History
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add to History</DialogTitle>
                                    <CardDescription>
                                        Enter subject name
                                    </CardDescription>
                                </DialogHeader>
                                <div className="flex">
                                    <Input
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.currentTarget.value)
                                        }
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="secondary">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button
                                            disabled={subject.length === 0}
                                            onClick={handleAddToHistory}
                                        >
                                            Add
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                    <Button
                        className="ml-auto"
                        variant="secondary"
                        onClick={handleReset}
                    >
                        Clear
                    </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-8">
                    <GradingSystem />
                    {isCalculated && (
                        <Result gwa={gwa} scale={scale} status={status} />
                    )}
                </div>
            </div>

            <div className="min-h-[384px] w-full max-w-3xl flex-grow p-4">
                <div className="flex items-center gap-4 p-4">
                    <h2 className="mr-auto text-lg font-medium">History</h2>
                    {history.length > 0 && (
                        <Button variant="destructive" onClick={clearHistory}>
                            Clear
                        </Button>
                    )}
                    <Button onClick={handleSave}>Save</Button>
                </div>
                <History ref={historyRef} />
            </div>
        </div>
    );
}
