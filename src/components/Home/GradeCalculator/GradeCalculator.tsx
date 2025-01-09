import GradeCalculatorGradingSystem from "@/components/Home/GradeCalculator/GradeCalculatorGradingSystem";
import { useState } from "react";
import GradeCalculatorForm from "./GradeCalculatorForm";
import GradeCalculatorResult from "./GradeCalculatorResult";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GradeCalculator() {
    const [calculation, setCalculation] = useState<Calculation | null>(null);

    return (
        <div className="w-full max-w-[calc(14rem+50ch)] flex-1 border-b p-8 xl:h-screen xl:border-b-0 xl:border-r">
            <div className="flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between xs:gap-8">
                <h1 className="mb-2 text-2xl font-semibold">
                    Grade Calculator
                </h1>

                <Button asChild variant="link" className="w-fit p-0">
                    <Link
                        target="_blank"
                        href="https://github.com/ajurian/sti-grade-calculator"
                        rel="noopener noreferrer"
                        className="text-sm"
                    >
                        Source code{" "}
                        <SquareArrowOutUpRight className="ml-0.5 inline w-4" />
                    </Link>
                </Button>
            </div>

            <div className="mb-8 text-muted-foreground">Enter your grades</div>

            <GradeCalculatorForm onCalculationChange={setCalculation} />

            <div className="mt-8 flex flex-wrap gap-8">
                <GradeCalculatorResult calculation={calculation} />
                <GradeCalculatorGradingSystem />
            </div>
        </div>
    );
}
